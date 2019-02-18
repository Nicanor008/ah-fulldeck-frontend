import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEmail } from "../../actions/resetActions";
import logo from "../../assets/images/logo.png";

class ResetPassword extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      isSent: false,
      email: "",
      errors: {}
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const { email } = this.state;

    //Check for errors

    if (email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }
    const newEmail = {
      email
    };

    this.props.addEmail(newEmail);

    // clear state
    this.setState({
      email: "",
      errors: {}
    });

  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    const { email, errors } = this.state;

    return (
      <div className="card mb-3" style={{ width: "35rem", margin: "0 auto" }}>
        <div className="card-header" style={{ backgroundColor: "#ffffff" }}>
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div className="card-body" style={{ backgroundColor: "#D3D3D3" }}>
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
              name="email"
              placeholder="Enter email to receive reset link"
              type="email"
              value={email}
              onChange={this.onChange}
              error={errors.email}
              required={true}
            />
            <button
              type="submit"
              aria-hidden="true"
              disabled={this.props.isSent}
              value="Send Email"
              className="btn btn-success btn-block"
            >
              Send Email
              {this.props.isSent && (
                <i className="fas fa-spinner fa-spin ml-2" />
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  addEmail: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  message: state.resetPassword,
  isSent: state.resetPassword.isSent
});

export default connect(
  mapStateToProps,
  { addEmail }
)(ResetPassword);
