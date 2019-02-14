import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Toaster from "./components/layout/Toaster";
import SignUp from "./components/auth/SignUp";

import "./App.scss";
import NavBar from "./components/navBar";
import AllArticles from "./components/articles/AllArticles";
import SingleArticle from "./components/articles/SingleArticle";
import CreateArticle from "./components/articles/CreateArticle";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Toaster />
          <NavBar />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/" exact component={AllArticles} />
            <Route path="/createarticle" exact component={CreateArticle} />
            <Route path="/:slug" exact component={SingleArticle} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
