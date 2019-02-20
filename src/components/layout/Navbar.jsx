import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/styles/NavBar.scss';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.png';

const NavBar = () => {
  const username = JSON.parse(localStorage.getItem('user')).username;
  return (
    <div className="container NavBar border border-secondary mt-1">
      <div className="row">
        <div className="col-md-4">
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div className="col-md-8 d-flex justify-content-end">
          <div>
            <div className="d-inline form-inline active-pink active-pink-2 mb-3 mt-0">
              <input
                className="form-control"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
            </div>
            <div className="d-inline">
              <a href="#s">
                <button type="button" className="btn btn-default btn-lg">
                  <span className="glyphicon glyphicon-bell" />
                </button>
              </a>
            </div>
            <div className="d-inline">
              <Link to={`/profile/${username}`}>
                <button type="button" className="btn btn-default btn-lg">
                  <span className="glyphicon glyphicon-user" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
