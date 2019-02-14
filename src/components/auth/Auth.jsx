const validToken = () => {
  const token = window.localStorage.getItem("token");
  if (!token) {
    return false;
  }
  return true;
};

const Auth = {
  isAuthenticated: validToken(),
  authenticate() {
    this.isAuthenticated = true;
  },
  signout() {
    this.isAuthenticated = false;
  }
};

export default Auth;
