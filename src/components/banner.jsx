import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/articles.scss';
import Auth from './auth/Auth';

const TitleCapture = () => (
  <div className="container-fluid">
    <div className="jumbotron bg-light pt-5 pb-5 text-center banner-jumbotron">
      <h1>Author's Haven</h1>
      <p className="banner-title text-center w-100">
        A social platform for the creative at heart
      </p>
      {!Auth.isAuthenticated && (
        <div>
          <p className="banner-text w-100">You curious?</p>
          <Link to="/signup" className="btn btn-success">
            Get Started
          </Link>
        </div>
      )}
    </div>
  </div>
);

export default TitleCapture;
