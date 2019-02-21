import React from 'react';
// import { Link } from "react-router-dom"

const TitleCapture = () => (
  <div className="container-fluid">
    <div
      className="jumbotron bg-light pt-5 pb-5 text-center"
      style={{ height: '300px' }}
    >
      <h1>Author's Haven</h1>
      <p style={{ fontSize: '1.9rem' }} className="w-100 text-center">
        A social platform for the creative at heart
      </p>
      <p style={{ fontSize: '1.5em' }} className="w-100 text-center">You curious?</p>
      {/* <Link to=""></Link> */}
      <button type="button" className="btn btn-success">Get Started</button>
    </div>
  </div>
);

export default TitleCapture;
