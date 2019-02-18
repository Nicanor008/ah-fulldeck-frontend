import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updatePassword } from "../../actions/resetActions";
import logo from "../../assets/images/logo.png";

class UpdatePassword extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.state = {
      isUpdated: false,
      password: "",
      confirm_password: "",
      errors: {}
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const { password, confirm_password } = this.state;

    //Check for errors

    if (password === "") {
      this.setState({ errors: { password: "Password is required" } });
      return;
    }

    if (confirm_password === "") {
      this.setState({
        errors: { confirm_password: "Confrim password is required" }
      });
      return;
    }

    if (password !== confirm_password) {
      this.setState({
        errors: { confirm_password: "Passwords do not match" }
      });
      return;
    }

    const { token } = this.props.match.params;
    const newPassword = {
      token,
      password,
      confirm_password
    };

    this.props.updatePassword(newPassword);

    // clear state
    this.setState({
      password: "",
      confirm_password: "",
      errors: {}
    });

    this.onSuccess();
    
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSuccess = () => {
    setTimeout(() => {
      const { message } = this.props;
      if(message.message === 'Your password has been reset') {
        const { history } = this.props;
        history.push('/login');
      };
      }, 3000);
  };
  
  render() {
    const { password, confirm_password, errors } = this.state;
    return (
      <div className="card mb-3" style={{ width: "35rem", margin: "0 auto" }}>
        <div className="card-header" style={{ backgroundColor: "#ffffff" }}>
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div className="card-body" style={{ backgroundColor: "#D3D3D3" }}>
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
              name="confirm_password"
              placeholder="Enter confirm password"
              type="password"
              value={confirm_password}
              onChange={this.onChange}
              error={errors.confirm_password}
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
  updatePassword: PropTypes.func.isRequired
};

// get the state and map them to props
const mapStateToProps = state => ({
  message: state.updateReducer,
  isUpdated: state.updateReducer.isUpdated
});

export default connect(
  mapStateToProps,
  { updatePassword }
)(UpdatePassword);
