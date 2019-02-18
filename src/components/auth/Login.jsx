import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import { connect } from "react-redux";
import { loginUser } from "../../actions/userActions";
import launchToast from "../../helpers/Toast";
import logo from "../../assets/images/logo.png";
import SocialLoginComponent from '../auth/socialauth/SocialLogin'

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    isLoading: false,
    success: false
  };
  componentDidUpdate() {
    const { user, history } = this.props;
    if (user.user) {
      if (user.user.success) {
        const username = user.user.username;
        launchToast(
          `${username} logged in successfully`,
          "toastSuccess",
          "descSuccess",
          "success"
        );
        localStorage.setItem("user", JSON.stringify(user.user));
        localStorage.setItem("token", user.user.token);
        history.push(`/`);
      }
    }
  }
  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    // Check For Errors
    if (email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }

    if (password === "") {
      this.setState({ errors: { password: "password is required" } });
      return;
    }
    const { user } = this.props;
    if (user.errors) {
      if (user.errors.error) {
        const message = user.errors.error[0];
        this.setState({ fuck: "message" });
        launchToast(message, "toastFail", "descFail", "fail");
      }
    }

    const newLogin = {
      email,
      password
    };

    this.props.loginUser(newLogin);
    this.setState({ errors: {} });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    const { password, email, errors } = this.state;
    return (
    
      <div className="card mb-3" style={{ width: "35rem", margin: "0 auto" }}>
        <div className="card-header" style={{ backgroundColor: "#ffffff" }}>
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div className="card-body" style={{ backgroundColor: "#D3D3D3" }}>
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

            <input
              type="submit"
              value="Login user"
              className="btn btn-success btn-block"
            />
          </form>
        </div>
        <div className='mb-3 text-center'>
        <div >OR</div>
        
      <p className="w-100"><small  className="text-center">Use your social accounts to login</small></p>
        <SocialLoginComponent/>
      </div>
      </div>
      
    
    );
  }
}
const mapStateToProps = state => ({
  user: state.login
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
