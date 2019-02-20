import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Input from './InputFields';
import { signUpUser } from '../../actions/signupActions';
import logo from '../../assets/images/logo.png';
import SocialLoginComponent from './socialauth/SocialLogin';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorNoMatch: null,
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      user: {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      },
    };
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ errorNoMatch: 'Passwords do not match' });
    } else {
      this.props.signUpUser(userData);
      this.setState({
        errorNoMatch: null,
      });
    }
  };

  onSuccess = () => {
    setTimeout(() => {
      const { history } = this.props;
      history.push('/');
    }, 3000);
  };

  render() {
    const emailErrorMessage = this.props.errors.errors
      ? this.props.errors.errors.email
      : null;
    const usernameErrorMessage = this.props.errors.errors
      ? this.props.errors.errors.username
      : null;
    const passwordErrorMessage = this.props.errors.errors
      ? this.props.errors.errors.password
      : null;
    const { message } = this.props;
    const {
      username,
      email,
      password,
      confirmPassword,
      errorNoMatch,
    } = this.state;

    return (
      <div className="card mb-3" style={{ width: '35rem', margin: '0 auto' }}>
        <div className="card-header" style={{ backgroundColor: '#ffffff' }}>
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div className="card-body" style={{ backgroundColor: '#D3D3D3' }}>
          <p style={{ color: 'red' }}>{errorNoMatch && errorNoMatch}</p>
          <form onSubmit={this.onSubmit}>
            <p style={{ color: 'green' }}>
              {message
                && 'User registered successfully. Check your mail for verification'}
            </p>
            {message ? this.onSuccess() : null}
            <div className="form-group mt-4 pb-0">
              <Input
                onChange={this.handleChange}
                name="username"
                value={username}
                type="text"
                placeholder="Enter your username"
                required
              />
              <p style={{ color: 'red' }}>{usernameErrorMessage}</p>
            </div>

            <div className="form-group mt-4 pb-0">
              <Input
                onChange={this.handleChange}
                name="email"
                value={email}
                type="email"
                placeholder="Enter your email"
                required
              />
              <p style={{ color: 'red' }}>{emailErrorMessage}</p>
            </div>
            <div className="form-group mt-4 pb-0">
              <Input
                onChange={this.handleChange}
                name="password"
                value={password}
                type="password"
                placeholder="Enter your password"
                required
              />
              <p style={{ color: 'red' }}>{passwordErrorMessage}</p>
            </div>
            <div className="form-group mt-4 pb-0">
              <Input
                onChange={this.handleChange}
                name="confirmPassword"
                value={confirmPassword}
                type="password"
                placeholder="Confirm your password"
                required
              />
              <p style={{ color: 'red' }}>{passwordErrorMessage}</p>
            </div>
            <button
              type="submit"
              aria-hidden="true"
              disabled={this.props.isLoading}
              value="Sign Up"
              className="btn btn-success btn-block"
            >
              Sign Up
              {this.props.isLoading && (
                <i className="fas fa-spinner fa-spin ml-2" />
              )}
            </button>
          </form>
        </div>
        <div>
          Already registered?
          <Link to="/login">Login</Link>
        </div>
        <div className="mb-3">
          <div>OR</div>

          <p>
            <small>Use your social accounts to login</small>
          </p>
          <SocialLoginComponent />
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  signUpUser: PropTypes.func.isRequired,
  isLoading: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  signup: state.signup,
  isLoading: state.data.isLoading,
  errors: state.data.errors,
  message: state.data.message,
});

export default connect(
  mapStateToProps,
  { signUpUser },
)(SignUp);
