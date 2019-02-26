import React from 'react';
import '../assets/styles/NavBar.scss';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import 'bootstrap';
import Auth from './auth/Auth';
import '../assets/styles/articles.scss';

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.assign('/');
};

const NavBar = () => (
  <div className="container NavBar">
    <div className="row">
      <div className="col-md-4">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
      </div>
      {Auth.isAuthenticated ? (
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
              <button type="button" className="btn btn-white btn-lg">
                <span className="glyphicon glyphicon-bell" />
              </button>
            </div>
            <div className="d-inline dropdown">
              <button
                className="btn btn-white dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="glyphicon glyphicon-user" />
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <Link
                  className="dropdown-item menu-dropdown-item"
                  to={`/profile/${
                    JSON.parse(localStorage.getItem('user')).username
                  }/`}
                >
                  My Profile
                </Link>

                <Link
                  className="dropdown-item menu-dropdown-item"
                  to="/article/create-article"
                >
                  New Article
                </Link>
                <Link
                  to="/articles/bookmarks"
                  className="dropdown-item menu-dropdown-item"
                >
                  Bookmarks
                </Link>
                <Link
                  to="/profiles"
                  className="dropdown-item menu-dropdown-item"
                >
                  Authors
                </Link>
                <button
                  type="button"
                  className="btn btn-default dropdown-item menu-dropdown-item"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="col-md-8 d-flex justify-content-end">
          <Link to="/login">
            <button type="button" className="btn btn-default btn-sm">
              Login
            </button>
          </Link>
        </div>
      )}
    </div>
  </div>
);

export default NavBar;
