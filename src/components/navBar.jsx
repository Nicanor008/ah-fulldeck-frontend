/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import '../assets/styles/NavBar.scss';

const NavBar = () => (
  <div className="container NavBar">
    <div className="row">
      <div className="col-md-4">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
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
              <button type="button" className="btn btn-default btn-sm">
                <span className="glyphicon glyphicon-bell" /> Bell
              </button>
            </a>
          </div>
          <div className="d-inline">
            <a href="#s">
              <button type="button" className="btn btn-default btn-sm">
                <span className="glyphicon glyphicon-bell" /> User
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default NavBar;
