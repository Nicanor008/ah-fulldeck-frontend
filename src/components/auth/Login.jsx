import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextInputGroup from '../layout/TextInputGroup';
import { loginUser } from '../../actions/userActions';
import SocialLoginComponent from './socialauth/SocialLogin';
import launchToast from '../../helpers/toaster';
import Auth from './Auth';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
  };

  componentDidUpdate() {
    const { user, history } = this.props;

    if (user.user) {
      if (user.user.success) {
        Auth.authenticate();
        const username = user.user.username;

        launchToast(`${username} logged in successfully`, 'toastSuccess', 'descSuccess', 'success');
        localStorage.setItem('user', JSON.stringify(user.user));
        localStorage.setItem('token', user.user.token);
        history.push('/');
      }
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    // Check For Errors
    if (email === '') {
      this.setState({ errors: { email: 'Email is required' } });
      return;
    }

    if (password === '') {
      this.setState({ errors: { password: 'password is required' } });
      return;
    }
    const { user } = this.props;
    if (user.errors && user.errors.error) {
      const message = user.errors.error[0];
      launchToast(message, 'toastFail', 'descFail', 'fail');
    }

    const newLogin = {
      email,
      password,
    };

    this.props.loginUser(newLogin);
    this.setState({ errors: {} });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { password, email, errors } = this.state;
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
              name="email"
              placeholder="Enter Email ..."
              value={email}
              onChange={this.onChange}
              error={errors.email}
            />
            <TextInputGroup
              name="password"
              type="password"
              placeholder="Enter password ..."
              value={password}
              onChange={this.onChange}
              error={errors.password}
            />

            <input type="submit" value="Login user" className="btn btn-success btn-block" />
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
              <button type="button" className="d-inline mr-2 btn btn-default btn-md">Forgot Password</button>

            </Link>
            <Link to="/signup">
              <button type="button" className="d-inline ml-1 btn btn-default btn-md">Create Account</button>

            </Link>
          </div>
        </center>
      </div>
    );
  }
}
Login.propTypes = {
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.login,
});
export default connect(mapStateToProps, { loginUser })(Login);
