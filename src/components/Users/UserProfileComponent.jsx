import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUserProfile } from '../../actions/Profile/userProfileAction';
import Loader from '../layout/Loader';
import NotFound from '../layout/NotFound';

class UserProfileComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetched: false,
    };
  }

  componentDidMount() {
    const { getUserProfile, match } = this.props;
    const { username } = match.params;
    getUserProfile(username).then(() => {
      this.setState({
        fetched: true,
      });
    });
  }

  render() {
    if (!this.state.fetched) {
      return <Loader />;
    }
    if (this.props.profile.errors) {
      return <NotFound />;
    }

    const {
      image,
      bio,
      username,
      followersCounr,
      followingCount,
    } = this.props.profile;
    return (
      <React.Fragment>
        <div className="container bg-light">
          <div className="row profile p-3 mt-1">
            <div className="col-md-9">
              <div className="col-md-2 ml-2">
                <img className="user-image" src={image} alt="" />
              </div>
              <div className="col-md-2 edit pt-3 mx-0">
                <h5>{username}</h5>
                <Link to={`edit-profile/${username}`}>
                  <button type="button" className="btn btn-primary edit-btn">
                    Edit Profile
                  </button>
                </Link>
              </div>
              <div className="col-md-2 pt-3 mx-0">
                <h3>{followersCounr}</h3>
                <p>Followers</p>
              </div>
              <div className="col-md-2 pt-3 mx-0">
                <h3>{followingCount}</h3>
                <p>Following</p>
              </div>
              <div className="bio mx-0 ">
                <p className="font-weight-bold">Bio</p>
                <p>{bio}</p>
              </div>
              <div />
            </div>
            <div className="col-md-2 mt-4 pt-2 mr-0">
              <form action="" className="form-group">
                <select className="form-control form-control-md">
                  <option>Select</option>
                  <option>New Article</option>
                  <option />
                  <option>Settings</option>
                  <option>Help</option>
                  <option>Logout</option>
                </select>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
UserProfileComponent.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object,
  match: PropTypes.object,
};
const mapStateToProps = state => ({
  profile: state.profile.profile,
});
export default connect(
  mapStateToProps,
  { getUserProfile },
)(UserProfileComponent);
