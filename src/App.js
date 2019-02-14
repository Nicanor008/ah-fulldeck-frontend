import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import Login from "./components/auth/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Toaster from "./components/layout/Toaster";
import SignUp from "./components/auth/SignUp";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Toaster />

        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
						<Route path="/signup" exact component={SignUp} />
          </Switch>
          </Router>
        </div>
     
    );
  }
}

export default App;
