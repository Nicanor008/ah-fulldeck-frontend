import React from 'react';
import { Link } from 'react-router-dom';

const Profile = profile => (
  <div className="card my-2">
    <Link to={`/profile/${profile.username}`} className="link-nostyle">
      <div className="card-header">{profile.username}</div>
    </Link>
    <div className="card-body row text-center">
      <Link to={`/profile/${profile.username}`} className="link-nostyle">
        <div className="col-md-2 mx-2">
          <img className="user-image" src={profile.image} alt="" />
        </div>
      </Link>
      <div className="col-md-2 pt-3 mx-0">
        <Link to={`/profile/${profile.username}/following`}>
          <button type="button" className="bt btn-outline-dark">
            Following
          </button>
        </Link>
        <h3>{profile.followingCount}</h3>
      </div>
      <div className="col-md-2 pt-3 mx-0 ">
        <Link to={`/profile/${profile.username}/followers`}>
          <button type="button" className="bt btn-outline-dark">
            Followers
          </button>
        </Link>

        <h3>{profile.followersCount}</h3>
      </div>
      <div className="col-md-2 pt-3 mx-1">
        <p className="font-weight-bold text-center w-100">Bio</p>
        <p className="w-100">{profile.bio}</p>
      </div>
      {JSON.parse(localStorage.getItem('user')).username
        !== profile.username && (
        <div className="col-md-2 my-auto mx-0 px-auto">
          {profile.page !== 'profiles'
            && (!profile.currentUserFollowing && !profile.followStatus) && (
              <button
                type="button"
                className="btn btn-outline-success edit-btn"
                onClick={e => profile.handleFollow(profile.username, e)}
              >
                Follow
              </button>
          )}
          {profile.page === 'following' && profile.currentUserFollowing && (
            <button
              type="button"
              className="btn btn-outline-warning edit-btn"
              onClick={e => profile.handleUnfollow(profile.username, e)}
            >
              Unfollow
            </button>
          )}
          {profile.followStatus
            && !profile.currentUserFollowing
            && profile.page !== 'profiles' && (
              <button
                type="button"
                className="btn btn-outline-dark edit-btn"
                onClick={e => profile.handleUnfollow(profile.username, e)}
                disabled
              >
                Already Following..
              </button>
          )}
        </div>
      )}
    </div>
  </div>
);
export default Profile;
