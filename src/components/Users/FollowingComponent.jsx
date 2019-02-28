/* eslint-disable no-alert */
/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getFollowing,
  getLoggedInUserFollowing,
  getAllUsers,
  followUser,
  unfollowUser,
} from '../../actions/Profile/userProfileAction';

import Loader from '../layout/Loader';
import Profile from './Profile';

// eslint-disable-next-line react/prefer-stateless-function
class FollowingComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetched: false,
      currentUserFollowing: false,
    };
  }

  componentDidMount() {
    const {
      getFollowing,
      getAllUsers,
      getLoggedInUserFollowing,
      match,
    } = this.props;
    const { username } = match.params;
    const loggedInUser = JSON.parse(localStorage.getItem('user')).username;
    getAllUsers().then(() => {
      getFollowing(username).then(() => {
        getLoggedInUserFollowing(loggedInUser)
          .then(() => {
            this.setState({
              fetched: true,
            });
          })
          .then(() => {
            if (loggedInUser === username) {
              this.setState({ currentUserFollowing: true });
            }
          });
      });
    });
  }

  handleFollow = (username, e) => {
    e.preventDefault();
    const { followUser } = this.props;
    followUser(username, this.props.match.params.username);
  };

  handleUnfollow = (username, e) => {
    e.preventDefault();
    const confirm = window.confirm(
      `Are you sure you want to unfollow ${username}`,
    );
    if (confirm) {
      const { unfollowUser } = this.props;
      unfollowUser(username, this.props.match.params.username);
    }
  };

  checkFollowingStatus = username => {
    // console.log(username);
    const { loggedInUserfollowing } = this.props.profile;
    const status = loggedInUserfollowing.following_detail.map(user => {
      //   console.log(user.username, username);
      if (user.username === username) {
        return true;
      }
      return false;
    });
    return status;
  };

  render() {
    if (!this.state.fetched) {
      return <Loader />;
    }
    const { following, match } = this.props;
    const loggedInUser = JSON.parse(localStorage.getItem('user')).username;

    if (this.props.following.details) {
      return (
        <div className="container">
          <div className="container-fluid">
            <div className="jumbotron bg-light h-25 text-center banner-jumbotron">
              <h2>No following</h2>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="container border border-dark py-5">
        <div className="container-fluid">
          <div className="jumbotron bg-light h-25 text-center banner-jumbotron">
            {loggedInUser === match.params.username ? (
              <h2>My following</h2>
            ) : (
              <h2>{following.message}</h2>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col col-10 h-100 mx-auto border border-dark">
            {following.following_detail.map(profile => {
              let status = null;
              status = this.checkFollowingStatus(profile.username);
              return (
                <Profile
                  image={profile.image}
                  username={profile.username}
                  followersCount={profile.followers_count}
                  followingCount={profile.following_count}
                  bio={profile.bio}
                  key={profile.username}
                  page="following"
                  handleFollow={this.handleFollow}
                  handleUnfollow={this.handleUnfollow}
                  followStatus={false || status.includes(true)}
                  currentUserFollowing={this.state.currentUserFollowing}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
FollowingComponent.propTypes = {
  getFollowing: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  getLoggedInUserFollowing: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  match: PropTypes.object,
  profile: PropTypes.object,
  following: PropTypes.object,
};
const mapStateToProps = state => ({
  following: state.following.following,
  profile: state.profile,
});
export default connect(
  mapStateToProps,
  {
    getFollowing,
    getAllUsers,
    followUser,
    unfollowUser,
    getLoggedInUserFollowing,
  },
)(FollowingComponent);
