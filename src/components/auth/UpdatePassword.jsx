import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextInputGroup from '../layout/TextInputGroup';
import { updatePassword } from '../../actions/resetActions';
import logo from '../../assets/images/logo.png';

class UpdatePassword extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.state = {
      password: '',
      confirmPassword: '',
      errors: {},
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const { password, confirmPassword } = this.state;

    // Check for errors

    if (password === '') {
      this.setState({ errors: { password: 'Password is required' } });
      return;
    }

    if (confirmPassword === '') {
      this.setState({
        errors: { confirmPassword: 'Confrim password is required' },
      });
      return;
    }

    if (password !== confirmPassword) {
      this.setState({
        errors: { confirmPassword: 'Passwords do not match' },
      });
      return;
    }

    const { token } = this.props.match.params;
    const newPassword = {
      token,
      password,
      confirm_password: confirmPassword,
    };

    this.props.updatePassword(newPassword);

    // clear state
    this.setState({
      password: '',
      confirmPassword: '',
      errors: {},
    });

    this.onSuccess();
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSuccess = () => {
    setTimeout(() => {
      const { message } = this.props;
      if (message.message === 'Your password has been reset') {
        const { history } = this.props;
        history.push('/login');
      }
    }, 3000);
  };

  render() {
    const { password, confirmPassword, errors } = this.state;
    return (
      <div className="card mb-3" style={{ width: '35rem', margin: '0 auto' }}>
        <div className="card-header" style={{ backgroundColor: '#ffffff' }}>
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div className="card-body" style={{ backgroundColor: '#D3D3D3' }}>
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
              name="password"
              placeholder="Enter new password"
              type="password"
              value={password}
              onChange={this.onChange}
              error={errors.password}
            />
            <TextInputGroup
              name="confirmPassword"
              placeholder="Enter confirm password"
              type="password"
              value={confirmPassword}
              onChange={this.onChange}
              error={errors.confirmPassword}
            />
            <button
              type="submit"
              aria-hidden="true"
              disabled={this.props.isUpdated}
              value="Reset Password"
              className="btn btn-success btn-block"
            >
              Reset Password
              {this.props.isUpdated && (
                <i className="fas fa-spinner fa-spin ml-2" />
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

UpdatePassword.propTypes = {
  updatePassword: PropTypes.func.isRequired,
  isUpdated: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

// get the state and map them to props
const mapStateToProps = state => ({
  message: state.updateReducer,
  isUpdated: state.updateReducer.isUpdated,
});

export default connect(
  mapStateToProps,
  { updatePassword },
)(UpdatePassword);
