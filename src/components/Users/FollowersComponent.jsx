/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getFollowers,
  getAllUsers,
  followUser,
  getLoggedInUserFollowing,
} from '../../actions/Profile/userProfileAction';
import Loader from '../layout/Loader';
import Profile from './Profile';

// eslint-disable-next-line react/prefer-stateless-function
class FollowersComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetched: false,
      currentUserFollowing: false,
    };
  }

  componentDidMount() {
    const {
      getFollowers,
      getAllUsers,
      getLoggedInUserFollowing,
      match,
    } = this.props;
    const { username } = match.params;
    const loggedInUser = JSON.parse(localStorage.getItem('user')).username;
    getAllUsers().then(() => {
      getFollowers(username).then(() => {
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
    const { followers, match } = this.props;
    const loggedInUser = JSON.parse(localStorage.getItem('user')).username;
    if (this.props.followers.details) {
      return (
        <div className="container">
          <div className="container-fluid">
            <div className="jumbotron bg-light h-25 text-center banner-jumbotron">
              <h2>No followers</h2>
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
              <h2>My followers</h2>
            ) : (
              <h2>{followers.message}</h2>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col col-10 h-100 mx-auto border border-dark">
            {followers.followers_detail.map(profile => {
              let status = false;
              status = this.checkFollowingStatus(profile.username);
              return (
                <Profile
                  image={profile.image}
                  username={profile.username}
                  followersCount={profile.followers_count}
                  followingCount={profile.following_count}
                  page="followers"
                  bio={profile.bio}
                  key={profile.username}
                  handleFollow={this.handleFollow}
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
FollowersComponent.propTypes = {
  getFollowers: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  getLoggedInUserFollowing: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  followers: PropTypes.object,
};
const mapStateToProps = state => ({
  followers: state.followers.followers,
  profile: state.profile,
});
export default connect(
  mapStateToProps,
  {
    getFollowers,
    getAllUsers,
    followUser,
    getLoggedInUserFollowing,
  },
)(FollowersComponent);
