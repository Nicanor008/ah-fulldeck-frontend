import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './components/auth/SignUp';
import ResetPassword from './components/auth/ResetPassword';
import UpdatePassword from './components/auth/UpdatePassword';
import './App.scss';
import AllArticles from './components/articles/AllArticles';
import SingleArticle from './components/articles/SingleArticle';
import CreateArticle from './components/articles/CreateArticle';
import UserProfileComponent from './components/Users/UserProfileComponent';
import EditUserProfileComponent from './components/Users/EditUserProfileComponent';
import CommentsContainer from './components/comments/CommentsContainer';
import Toaster from './components/layout/Toaster';
import NotFound from './components/layout/NotFound';
import PrivateRoute from './components/auth/PrivateRedirect';
import EditArticle from './components/articles/EditArticle';
import NavBar from './components/navBar';
import Bookmarks from './components/articles/boomarks/AllBookmarks';
import UsersProfilesComponent from './components/Users/UsersProfilesComponent';
import FollowingComponent from './components/Users/FollowingComponent';
import FollowersComponent from './components/Users/FollowersComponent';
import UpdateComment from './components/comments/UpdateComment';

// eslint-disable-next-line react/prefer-stateless-function
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

            <Route
              exact
              path="/profile/:username"
              component={UserProfileComponent}
            />
            <Route exact path="/profiles" component={UsersProfilesComponent} />
            <Route
              exact
              path="/profile/:username/following"
              component={FollowingComponent}
            />
            <Route
              exact
              path="/profile/:username/followers"
              component={FollowersComponent}
            />
            <Route
              exact
              path="/profile/edit-profile/:username"
              component={EditUserProfileComponent}
            />
            <Route path="/" exact component={AllArticles} />
            <PrivateRoute
              path="/:slug/comments"
              component={CommentsContainer}
            />
            <Route path="/:slug" exact component={SingleArticle} />
            <PrivateRoute
              path="/article/edit/:slug"
              exact
              component={EditArticle}
            />
            <PrivateRoute
              path="/article/create-article"
              exact
              component={CreateArticle}
            />
            <PrivateRoute
              path="/articles/bookmarks"
              exact
              component={Bookmarks}
            />
            <Route path="/article/:slug" exact component={SingleArticle} />
            <Route exact path="/password-reset" component={ResetPassword} />
            <PrivateRoute path="/article/edit/:slug" exact component={EditArticle} />
            <PrivateRoute path="/:slug/comments" component={CommentsContainer} />
            <PrivateRoute path="/article/:slug/comments/edit/:id" component={UpdateComment} />
            <Route
              exact
              path="/password-update/:token"
              component={UpdatePassword}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
