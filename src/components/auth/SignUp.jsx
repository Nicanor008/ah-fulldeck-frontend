import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { signUpUser } from '../../actions/signupActions';
import SocialLoginComponent from './socialauth/SocialLogin';
import '../../assets/styles/Signup.scss';

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
// eslint-disable-next-line
const usernameRegex = RegExp(/^(?!.*\ )[A-Za-z\d\-\_]{3,}$/);
const passwordRegex = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  /* eslint-disable no-unused-expressions */
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      confirmpassword: '',
      errorNoMatch: null,
      formErrors: {
        username: '',
        email: '',
        password: '',
      },
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      user: {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      },
    };

    if (formValid && this.state.password === this.state.confirmpassword) {
      this.props.signUpUser(userData);
    } else {
      this.setState({ errorNoMatch: 'Passwords do not match' });
    }
  };

  onSuccess = () => {
    setTimeout(() => {
      // eslint-disable-next-line react/prop-types
      const { history } = this.props;
      history.push('/');
    }, 3000);
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    // eslint-disable-next-line react/no-access-state-in-setstate
    const formErrors = { ...this.state.formErrors };

    switch (name) {
      case 'username':
        formErrors.username = usernameRegex.test(value)
          ? ''
          : 'Enter a username with more than 3 characters.Username cannot contain a space or special character ';
        break;
      case 'email':
        formErrors.email = emailRegex.test(value) ? '' : 'Email must be of the format name@domain.com';
        break;
      case 'password':
        formErrors.password = passwordRegex.test(value)
          ? ''
          : 'Password must be more than 7 characters and at least 1 lowercase 1 uppercase letter and 1 number';
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };


  render() {
    const emailErrorMessage = this.props.errors.errors && this.props.errors.errors.email;
    const { formErrors, errorNoMatch } = this.state;
    // eslint-disable-next-line react/prop-types
    const { message } = this.props;
    return (
      <div className="card mb-3" style={{ width: '45rem', margin: '0 auto' }}>
        <div className="card-header" style={{ backgroundColor: '#ffffff' }}>
          <h4>Sign up</h4>
        </div>
        <div className="card-body" style={{ backgroundColor: '#D3D3D3' }}>
          <h1>Create Account</h1>
          <form onSubmit={this.onSubmit}>
            <p style={{ color: 'green' }}>
              {message && 'User registered successfully. Check your mail for verification'}
            </p>
            {message && this.onSuccess()}
            <div className="username">
              <label htmlFor="username">Username</label>
              <input
                className={formErrors.username.length > 0 && 'error'}
                placeholder="Username"
                type="text"
                name="username"
                noValidate
                onChange={this.handleChange}
                required
              />
              {formErrors.username.length > 0 && <span className="errorMessage">{formErrors.username}</span>}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 && 'error'}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
                required
              />
              <p style={{ color: 'red' }}>{emailErrorMessage}</p>

              {formErrors.email.length > 0 && <span className="errorMessage">{formErrors.email}</span>}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 && 'error'}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
                required
              />
              {formErrors.password.length > 0 && <span className="errorMessage">{formErrors.password}</span>}
            </div>
            <div className="password">
              <label htmlFor="confirmpassword"> Confirm Password</label>
              <input
                placeholder="Confirm Password"
                type="password"
                name="confirmpassword"
                noValidate
                onChange={this.handleChange}
                required
              />
              <p style={{ color: 'red' }}>{errorNoMatch && errorNoMatch}</p>
            </div>
            <button
              type="submit"
              aria-hidden="true"
              disabled={this.props.isLoading}
              value="Sign Up"
              className="btn btn-success btn-block"
            >
              Sign Up
              {this.props.isLoading && <i className="fas fa-spinner fa-spin ml-2" />}
            </button>
          </form>
        </div>
        <center>
          <div className="pt-2">
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
        </center>
      </div>
    );
  }
}
SignUp.defaultProps = {
  isLoading: false,
};

SignUp.propTypes = {
  signUpUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,

};

const mapStateToProps = (state) => ({
  signup: state.signup,
  isLoading: state.data.isLoading,
  errors: state.data.errors,
  message: state.data.message,
});

export default connect(mapStateToProps, { signUpUser })(SignUp);
