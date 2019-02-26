import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextInputGroup from '../layout/TextInputGroup';
import { loginUser } from '../../actions/userActions';
import SocialLoginComponent from './socialauth/SocialLogin';
import Auth from './Auth';

const emailRegex = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
    formErrors: {
      email: '',
    },
  };

  componentDidUpdate() {
    const { user, history } = this.props;

    if (user.user) {
      if (user.user.success) {
        Auth.authenticate();
        localStorage.setItem('user', JSON.stringify(user.user));
        localStorage.setItem('token', user.user.token);
        history.push('/');
      }
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    // Check For Errors
    if (password === '') {
      this.setState({ errors: { password: 'password is required' } });
      return;
    }

    const newLogin = {
      email,
      password,
    };

    this.props.loginUser(newLogin);
    this.setState({ errors: {} });
  };

  onChange = e => {
    const { name, value } = e.target;
    const formErrors = {
      // eslint-disable-next-line react/no-access-state-in-setstate
      ...this.state.formErrors,
    };

    switch (name) {
      case 'email':
        formErrors.email = emailRegex.test(value)
          ? ''
          : 'Email must be of the format name@domain.com';
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  render() {
    const {
      password, email, formErrors, errors,
    } = this.state;
    return (
      <div className="card mb-3" style={{ width: '35rem', margin: '0 auto' }}>
        <div
          className="card-header text-center"
          style={{
            backgroundColor: '#ffffff',
            fontWeight: 'bolder',
            fontSize: '25px',
          }}
        >
          Login
        </div>
        <div
          className="card-body"
          style={{ backgroundColor: 'rgb(236, 228, 223)' }}
        >
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
              className={formErrors.email.length > 0 && 'error'}
              name="email"
              placeholder="Enter Email ..."
              value={email}
              noValidate
              onChange={this.onChange}
              error={formErrors.email}
            />
            <TextInputGroup
              name="password"
              type="password"
              placeholder="Enter password ..."
              value={password}
              onChange={this.onChange}
              noValidate
              error={errors.password}
            />
            <button
              type="submit"
              aria-hidden="true"
              disabled={this.props.isLoading}
              value="Login user"
              className="btn btn-success btn-block"
            >
              Login user
              {this.props.user.isLoading && (
                <i className="fas fa-spinner fa-spin ml-2" />
              )}
            </button>
          </form>
        </div>

        <center>
          <div className="mb-3">
            <div>OR</div>

            <p>
              <small>Use your social accounts to login</small>
            </p>
            <SocialLoginComponent />
            <Link to="/password-reset">
              <button
                type="button"
                className="d-inline mr-2 btn btn-default btn-md"
              >
                Forgot Password
              </button>
            </Link>
            <Link to="/signup">
              <button
                type="button"
                className="d-inline ml-1 btn btn-default btn-md"
              >
                Create Account
              </button>
            </Link>
          </div>
        </center>
      </div>
    );
  }
}
Login.defaultProps = {
  isLoading: false,
};
Login.propTypes = {
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};
const mapStateToProps = state => ({
  user: state.login,
  isLoading: state.data.isLoading,
});
export default connect(
  mapStateToProps,
  { loginUser },
)(Login);
