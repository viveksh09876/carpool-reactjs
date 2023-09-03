import React from "react";
import mapImg from '../../images/mapmarker.PNG'
import "./modal.css";

export default class Modal extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modal" id="modal">
        <div className="cover"></div>
        <div className="container">
          <div className="content">
            <h3>Drag marker to select address</h3>
            <img src={mapImg} className="mapImg"/>
            <div className="box">
              <input type="text" className="input" name="name" placeholder="Address" />
            </div>
          </div>
          <div className="action">
            <button class="toggle-button" onClick={this.onClose}>
              Update
            </button>
            <button class="toggle-button" onClick={this.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}