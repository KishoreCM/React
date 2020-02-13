import React, { Component } from "react";
import Sample from "./sample";
import { Button } from "react-bootstrap";

class SampleButton extends Component {
  state = {
    showModal: false
  };

  setModalShow = e => {
    this.setState({ showModal: e });
  };

  render() {
    return (
      <div>
        <Button variant="primary" onClick={() => this.setModalShow(true)}>
          Launch vertically centered modal
        </Button>

        <Sample
          show={this.state.showModal}
          onHide={() => this.setModalShow(false)}
        />
      </div>
    );
  }
}

export default SampleButton;
