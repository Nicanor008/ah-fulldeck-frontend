import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    const { password, email, errors } = this.state;
    return (
      <div className="card mb-3" style={{ width: "35rem", margin: "0 auto" }}>
        <div className="card-header">Add Contact</div>
        <div className="card-body">
          <form>
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

            <input
              type="submit"
              value="Login user"
              className="btn btn-success btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
