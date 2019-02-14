import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.scss";
import Login from "./components/auth/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Toaster from "./components/layout/Toaster";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Toaster />
          <Switch>
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
