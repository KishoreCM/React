import React, { Component } from "react";
import ExpenseName from "./expensename";
import ExpenseYouPaid from "./expenseyoupaid";
import ExpenseYouLent from "./expenseyoulent";

class ExpenseList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="add_expense summary">
          <div className="main-block">
            <div className="date">
              {this.props.current_expense_data["onMonth"]}
              <div className="number">
                {this.props.current_expense_data["onDate"]}
              </div>
            </div>
            <div className="header_name">
              <ExpenseName
                key={this.props.id}
                expenseName={
                  this.props.current_expense_data["expense_" + this.props.id]
                }
              />
            </div>
          </div>
          <div className="cost">
            you paid <br />{" "}
            <ExpenseYouPaid
              key={this.props.id}
              youPaid={
                this.props.current_expense_data["youPaid_" + this.props.id]
              }
            />
          </div>
          <div className="you">
            you lent <br />
            <ExpenseYouLent
              key={this.props.id}
              youLent={
                this.props.current_expense_data["youLent_" + this.props.id]
              }
            />
          </div>
          <div className="delete_actions">
            <a /*href="www.splitwise.com"*/ className="delete">x</a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ExpenseList;
