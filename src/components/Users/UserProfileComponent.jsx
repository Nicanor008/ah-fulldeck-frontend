/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  getUserProfile,
  followUser,
} from '../../actions/Profile/userProfileAction';
import Loader from '../layout/Loader';
import NotFound from '../layout/NotFound';
import { getAllArticles } from '../../actions/articleActions';
import Article from '../articles/Article';

class UserProfileComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetched: false,
    };
  }

  componentDidMount() {
    const { getUserProfile, getAllArticles, match } = this.props;
    const { username } = match.params;
    getUserProfile(username).then(() => {
      getAllArticles(1, 200).then(() => {
        this.setState({
          fetched: true,
        });
      });
    });
  }

  handleFollow = (username, e) => {
    // console.log(username);
    e.preventDefault();
    const { followUser } = this.props;
    followUser(username, this.props.match.params.username);
    // console.log(this.props);
  };

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
      followers_count,
      following_count,
    } = this.props.profile;
    const { notFetching, articles, match } = this.props;
    // console.log(articles);
    const loggedInUser = JSON.parse(localStorage.getItem('user')).username;
    return (
      <React.Fragment>
        <div className="container bg-light">
          <div className="row profile p-3 mt-1">
            <div className="col-md-9">
              <div className="col-md-2 ml-2">
                <h5 className="w-100 text-center">{username}</h5>
                <img className="user-image" src={image} alt="" />
              </div>
              <div className="col-md-2 edit pt-3 mx-0">
                {this.props.match.params.username === loggedInUser && (
                  <Link to={`/profile/edit-profile/${username}`}>
                    <button type="button" className="btn btn-primary edit-btn">
                      Edit Profile
                    </button>
                  </Link>
                )}
                {this.props.match.params.username !== loggedInUser && (
                  <Link to={`/profile/edit-profile/${username}`}>
                    <button
                      type="button"
                      className="btn btn-outline-success edit-btn"
                      onClick={e => this.handleFollow(username, e)}
                    >
                      Follow
                    </button>
                  </Link>
                )}
                ,
              </div>
              <div className="col-md-2 pt-3 mx-0">
                <Link to={`/profile/${username}/following`}>
                  <button type="button" className="bt btn-outline-dark">
                    Following
                  </button>
                </Link>
                <h3>{following_count}</h3>
              </div>
              <div className="col-md-2 pt-3 mx-0 ">
                <Link to={`/profile/${username}/followers`}>
                  <button type="button" className="bt btn-outline-dark">
                    Followers
                  </button>
                </Link>
                <h3>{followers_count}</h3>
              </div>
              <div className="bio mx-0 ">
                <p className="font-weight-bold w-100 text-center">Bio</p>
                <p className="w-100 text-center">{bio}</p>
              </div>
              <div />
            </div>
            <div className="col-md-2 mt-4 pt-2 mr-0">
              <form action="" className="form-group">
                <select className="form-control form-control-md">
                  <option>Select</option>
                  <option>New Article</option>
                  <option>Settings</option>
                  <option>Help</option>
                  <option>Logout</option>
                </select>
              </form>
            </div>
          </div>
          <div className="container-fluid">
            <div className="jumbotron bg-light h-25 text-center banner-jumbotron">
              {loggedInUser === match.params.username ? (
                <h2>My articles</h2>
              ) : (
                <h2>
                  Articles by
                  {match.params.username}
                </h2>
              )}
            </div>
          </div>
          <div className="container card bg-light ">
            {notFetching && (
              <div className="bg-light ">
                {articles.article.results.map(article => {
                  if (
                    article.author.username === this.props.match.params.username
                  ) {
                    return (
                      <Article
                        title={article.title}
                        description={article.description}
                        author={article.author}
                        key={article.slug}
                        slug={article.slug}
                        created_at={new Date(article.created_at).toDateString()}
                        like={article.likes}
                        views={article.views}
                        bookmarked={article.bookmarked}
                        dislike={article.dislikes}
                        rating={article.avg_rating.avg_rating}
                      />
                    );
                  }
                  return null;
                })}
              </div>
            )}
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
  getAllArticles: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  articles: PropTypes.object,
  notFetching: PropTypes.bool.isRequired,
};
const mapStateToProps = state => ({
  profile: state.profile.profile,
  articles: state.articles.articles,
  notFetching: state.articles.notFetching,
});
export default connect(
  mapStateToProps,
  { getUserProfile, getAllArticles, followUser },
)(UserProfileComponent);
