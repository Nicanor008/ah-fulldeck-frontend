import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import BookmarkArticle from './boomarks/Bookmark';
import Auth from '../auth/Auth';
import CommentsContainer from '../comments/CommentsContainer';
import Rating from '../rating/RatingArticle';
import DisplayRating from '../rating/DisplayRating';
import { getSingleArticle, deleteArticle } from '../../actions/articleActions';
import LikesDislikes from './LikeDislikeArticle';
import launchToast from '../../helpers/toaster';
import '../../assets/styles/articles.scss';
import ShareArticle from '../socialshare/ShareArticle';
import ReportArticle from './report/Report';

class SingleArticle extends Component {
  // eslint-disable-next-line react/no-unused-state
  state = {
    article: {},
  };

  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.getSingleArticle(slug);
  }

  buttonDeleteArticle = () => {
    const slug = this.props.article.article.slug;
    const confirmDelete = window.confirm('Are you sure you want to Delete?');
    if (confirmDelete) {
      this.props.deleteArticle(slug);
      launchToast('Article Deleted', 'toastSuccess', 'descSuccess', 'success');
      this.props.history.push('/');
      window.location.reload();
    }
  };

  checkLoggedInUser = () => {
    const { article } = this.props;
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      const user = JSON.parse(localStorage.getItem('user')).username;
      if (user === this.props.article.article.author.username) {
        return (
          <React.Fragment>
            <Link
              to={{
                pathname: `/article/edit/${article.article.slug}`,
                article: { ...article },
              }}
              className="slug-link"
            >
              <button type="button" className="d-inline btn btn-success mr-1">
                Edit
              </button>
            </Link>
            <button
              className="d-inline btn btn-danger ml-1"
              onClick={this.buttonDeleteArticle}
            >
              Delete
            </button>
          </React.Fragment>
        );
      }
    }
  };

  render() {
    const { notFetching, article } = this.props;
    return (
      <React.Fragment>
        <div>
          {notFetching && (
            <div>
              <div className="container mt-3">
                <div className="container card border border-dark bg-light">
                  <div className="card-header border-0 bg-light">
                    <div className="row  border border-dark border-top-0 border-right-0 border-left-0">
                      <div className="col-sm-1">
                        <img
                          src={article.article.author.image}
                          alt=""
                          className="rounded-circle w-75 border ml-2"
                        />
                      </div>
                      <div>
                        <span className="font-weight-bold">
                          {article.article.author.username}
                        </span>
                        <br />
                        <span>
                          {new Date(article.article.created_at).toDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="card-text font-weight-bold text-center display-2">
                        <h2>
                          <strong style={{ color: 'black' }}>
                            {article.article.title}
                          </strong>
                        </h2>
                      </div>
                      <span>Avg rating</span>
                      <DisplayRating {...this.props} />
                      <div className="row">
                        <div className="col-md-12 pt-3 article-body">
                          {article.article.image_url && (
                            <div className="pull-left body-img">
                              <img
                                src={article.article.image_url}
                                alt="ArticleImage"
                                className="img-responsive pull-left pr-3 pb-3"
                              />
                            </div>
                          )}
                          {ReactHtmlParser(article.article.body)}
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="row pt-3">
                      <div className="col-sm-3 article-views">
                        {this.checkLoggedInUser()}
                      </div>
                      <div className="col-sm-2 d-inline">
                        {Auth.isAuthenticated ? (
                          <LikesDislikes {...this.props} />
                        ) : (
                          <div className="likecontainer">
                            <i className="fa fa-thumbs-up fa-2x " />
                            {article.article.likes}
                            &nbsp;&nbsp;&nbsp;
                            <i className="fa fa-thumbs-down fa-2x " />
                            &nbsp;&nbsp;&nbsp;
                            {article.article.dislikes}
                          </div>
                        )}
                      </div>
                      <div className="col-sm-2 d-inline">
                        {Auth.isAuthenticated && <Rating {...this.props} />}
                      </div>
                      <div className="col-sm-3">
                        <i className="glyphicon glyphicon-eye-open ml-2  d-inline text-primary" />
                        <div className="views-count ml-2 d-inline">
                          {article.article.views}
                        </div>
                        <div className="pl-1 d-inline font-weight-normal">
                          Views
                        </div>
                      </div>
                      <div className="col-sm-2">
                        <BookmarkArticle bookmarked={article.article.bookmarked} slug={article.article.slug}  />
                      </div>
                      <div className="col col-md-1 w-25">
                        {Auth.isAuthenticated && (
                          <ReportArticle {...this.props} />
                        )}
                      </div>
                    </div>
                  </div>
                  <div />
                </div>
                <ShareArticle {...this.props} />
              </div>
              <CommentsContainer {...this.props} />
              <div className="card-footer bg-light" />
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}
SingleArticle.propTypes = {
  slug: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  getSingleArticle: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  notFetching: PropTypes.bool.isRequired,
  article: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  article: state.article.article,
  notFetching: state.article.notFetching,
});

export default connect(
  mapStateToProps,
  { getSingleArticle, deleteArticle },
)(SingleArticle);
