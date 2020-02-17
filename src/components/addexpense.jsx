import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import AddGroup from "../addgroupcontroller";
//import { withRouter } from "react-router-dom";

class AddExpense extends Component {
  getMonth() {
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    return months[new Date().getMonth()];
  }

  addExpense = () => {
    let expenses = this.props.current_data.expenses;
    let expensesSize = expenses ? Object.keys(expenses).length : 0;
    let expenseName = this.refs.description.value;
    let totalAmount = this.refs.amount.value;
    let { members_count } = this.props.current_data;
    let amountPerHead = Number(
      (Number(totalAmount) / (Number(members_count) + 1)).toFixed(2)
    );
    console.log(typeof totalAmount);
    let updateCurrentData = this.props.current_data;
    console.log(this.props.current_data);
    let newExpense = {};
    newExpense["expense_" + expensesSize] = expenseName;
    newExpense["youPaid_" + expensesSize] = totalAmount;
    newExpense["youLent_" + expensesSize] = (
      totalAmount - amountPerHead
    ).toFixed(2);
    newExpense["onMonth"] = this.getMonth();
    newExpense["onDate"] = new Date().getDate();
    updateCurrentData.expenses.push(newExpense);
    for (var i = 0; i < updateCurrentData.friends_name.length; i++) {
      updateCurrentData.friends_name[i]["owes_" + i] += amountPerHead;
    }
    //console.log(updateCurrentData.friends_name);

    updateCurrentData.owed = Number(
      Number(updateCurrentData.owed) +
        Number((totalAmount - amountPerHead).toFixed(2))
    );

    //this.setState({ current_data: updateCurrentData });
    AddGroup.setAddExpense(this.props.current_data, () =>
      alert("Expense Added!")
    );

    this.refs.description.value = "";
    this.refs.amount.value = "";

    //this.props.history.push("/dashboard");
  };

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add expense
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h6>
              With{" "}
              <b>
                <i>you</i>
              </b>{" "}
              and all of:{" "}
              <b>
                <i>{this.props.group_name}</i>
              </b>
            </h6>
          </div>
          <div>
            <center>
              <span style={{ marginRight: "20px" }}>
                <i className="fa fa-arrow-down"></i>
              </span>
              <label>
                <i>Enter a description</i>
              </label>
            </center>
            <center>
              <input type="text" placeholder="Description" ref="description" />
            </center>
            <center>
              <input type="text" placeholder="Amount in Rs." ref="amount" />
            </center>
            <center>
              <label>
                <i>Enter amount</i>
              </label>{" "}
              <span style={{ marginLeft: "60px" }}>
                <i className="fa fa-arrow-up"></i>
              </span>
            </center>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.addExpense}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddExpense;

//import "../modal.css";
/*
class AddExpense extends Component {
  state = {};

  toggleModal = e => {
    let modal = this.modalElement;
    if (modal.style.display === "none") modal.style.display = "block";
    else modal.style.display = "none";
  };

  render() {
    return (
      <div>
        <button onClick={e => this.toggleModal()}>button</button>

        <div
          ref={modal => (this.modalElement = modal)}
          className="modal"
          id="postModal"
          style={{ display: "none" }}
        >
          <div className="popup">
            <h2>Add New Movie</h2>
            <button
              ref={modalClose => (this.modalCloseElement = modalClose)}
              id="closeButton"
              onClick={e => this.toggleModal(e)}
              className="close"
              style={{ height: "5vh" }}
            >
              &times;
            </button>
            <div className="content">
              <input
                type="text"
                placeholder="Movie Name"
                className="inputs"
                name="movieName"
                value={this.state.movieName}
                onChange={e => this.change(e)}
                style={{ height: "4vh" }}
              ></input>
              <br />
              <br />
              <input
                type="text"
                placeholder="Movie Description"
                className="inputs"
                name="movieDesc"
                value={this.state.movieDesc}
                onChange={e => this.change(e)}
              ></input>
              <br />
              <br />
              <input
                type="text"
                placeholder="Cast"
                className="inputs"
                name="movieCast"
                value={this.state.movieCast}
                onChange={e => this.change(e)}
                style={{ height: "4vh" }}
              ></input>
              <br />
              <br />
              <input
                type="text"
                placeholder="Director"
                className="inputs"
                name="movieDirector"
                value={this.state.movieDirector}
                onChange={e => this.change(e)}
                style={{ height: "4vh" }}
              ></input>
              <br />
              <br />
              <input
                type="text"
                placeholder="Rating (on a scale of 5)"
                className="inputs"
                name="movieRating"
                value={this.state.movieRating}
                onChange={e => this.change(e)}
                style={{ height: "4vh" }}
              ></input>
              <br />
              <br />
              <br />
              <label style={{ color: "black" }}>
                Upload Image ---> &nbsp;&nbsp;
              </label>
              <input
                style={{ width: "60%", color: "black" }}
                type="file"
                name="movieImage"
                onChange={e => this.imageUpload(e)}
              ></input>
              <br />
              <br />
              <button onClick={e => this.addMovie(e)} id="modalPostButton">
                Add Movie
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddExpense;
*/
