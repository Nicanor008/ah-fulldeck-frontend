import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./components/auth/SignUp";

import "./App.scss";
import AllArticles from "./components/articles/AllArticles";
import SingleArticle from "./components/articles/SingleArticle";
import CreateArticle from "./components/articles/CreateArticle";
import UserProfileComponent from "./components/Users/UserProfileComponent";
import EditUserProfileComponent from "./components/Users/EditUserProfileComponent";
import Toaster from "./components/layout/Toaster";
import NotFound from "./components/layout/NotFound";

class App extends Component {
  render() {
    return (
        <Router>
        <div className="App">
          <Toaster />
            <Switch>
            <Route exact path="/login" component={Login} />
						<Route path="/signup" exact component={SignUp} />

            <Route
              exact
              path="/profile/:username"
              component={UserProfileComponent}
            />
            <Route
              exact
              path="/profile/edit-profile/:username"
              component={EditUserProfileComponent}
            />
            <Route path="/" exact component={AllArticles} />
            <Route path="/createarticle" exact component={CreateArticle} />
            <Route path="/:slug" exact component={SingleArticle} />
            <Route component={NotFound}/>
          </Switch>
        </div>
          </Router>
     
    );
  }
}

export default App;
