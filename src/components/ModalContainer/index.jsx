import React from "react";
import "./modal-container.css";

export default class ModalContainer extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modal-container" id="modal">
        <div className="cover"></div>
        <div className="container">
          <div className="content">
            {this.props.children}
          </div>
          <div className="action">
            <button class="toggle-button" onClick={this.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}