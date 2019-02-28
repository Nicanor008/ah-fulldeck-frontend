/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getAllUsers,
  followUser,
} from '../../actions/Profile/userProfileAction';
import Loader from '../layout/Loader';
import Profile from './Profile';

class UsersProfilesComponent extends Component {
  constructor() {
    super();
    this.state = {
      fetched: false,
    };
  }

  componentDidMount() {
    const { getAllUsers } = this.props;
    getAllUsers().then(() => {
      this.setState({
        fetched: true,
      });
    });
  }

  handleFollow = (username, e) => {
    e.preventDefault();
    const { followUser } = this.props;
    followUser(username);
  };

  render() {
    if (!this.state.fetched) {
      return <Loader />;
    }
    const { profiles } = this.props;
    return (
      <div className="container bg-light border border-dark pb-5">
        <div className="row profile p-3 mt-1 pt-0">
          <div className="col-md-12">
            <div className="container-fluid">
              <div className="jumbotron bg-light w-100 text-center h-25 banner-jumbotron">
                <h2>Our Awesome Authors</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col-9 h-100 mx-auto">
            {profiles.results.map(profile => (
              <Profile
                image={profile.image}
                username={profile.username}
                followersCount={profile.followers_count}
                followingCount={profile.following_count}
                bio={profile.bio}
                page="profiles"
                key={profile.username}
                followStatus
                handleFollow={this.handleFollow}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
UsersProfilesComponent.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  profiles: PropTypes.object,
};
const mapStateToProps = state => ({
  profiles: state.usersProfiles.usersProfiles,
  follow: state.usersProfiles.follow,
});
export default connect(
  mapStateToProps,
  { getAllUsers, followUser },
)(UsersProfilesComponent);
