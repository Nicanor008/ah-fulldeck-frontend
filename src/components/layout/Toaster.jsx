import React, { Component } from 'react'

class Toaster extends Component {
  render() {
    return (
        <div>
        <div className='toast' id="toastSuccess"><div className="toastImg"><i className="toastIcon fas fa-check"/></div><div className='toastDesc' id="descSuccess"></div></div>
        <div className='toast' id="toastFail"><div className="toastImg"><i className="toastIcon fas fa-times"/></div><div className='toastDesc' id="descFail"></div></div>
        </div>
    )
  }
}

export default Toaster;
