import React, { Component } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class Toaster extends Component {
  render() {
    return (
      <div>
        <div className="toast" id="toastSuccess">
          <div className="toastImg">
            <i className="toastIcon fas fa-check" />
          </div>
          <div className="toastDesc" id="descSuccess" />
        </div>
        <div className="toast" id="toastFail">
          <div className="toastImg">
            <i className="toastIcon fas fa-times" />
          </div>
          <div className="toastDesc" id="descFail" />
        </div>
      </div>
    );
  }
}

export default Toaster;
