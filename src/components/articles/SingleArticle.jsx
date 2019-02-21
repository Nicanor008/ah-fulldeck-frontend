import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import Auth from '../auth/Auth';
import { getSingleArticle } from '../../actions/articleActions';
import pen from '../../assets/images/pen.jpg';
import NavBar from '../layout/Navbar';
import LikesDislikes from './LikeDislikeArticle';

class SingleArticle extends Component {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.getSingleArticle(slug);
  }

  render() {
    const { notFetching, article } = this.props;
    return (
      <React.Fragment>
        <NavBar />
        <div>
          {notFetching && (
            <div>
              <div className="container mt-3">
                <div className="container card border border-dark  bg-light">
                  <div className="card-header border-0 bg-light">
                    <div className="row  border border-dark border-top-0 border-right-0 border-left-0">
                      <div className="col col-sm-1">
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
                      <div className="row">
                        <div className="col col-md-5">
                          <img
                            src={pen}
                            alt="logo"
                            className="logo w-100 h-100 mx-3"
                          />
                        </div>
                        <div className="col col-md-5">
                          {ReactHtmlParser(article.article.body)}
                        </div>
                      </div>
                      {Auth.isAuthenticated ? (
                    <LikesDislikes {...this.props} />
                  ) : (
                    <div className="likecontainer">
                      <i className="fa fa-thumbs-up fa-2x " />
                      {' '}
                      {article.article.likes}
                      {' '}
                      &nbsp;&nbsp;&nbsp;
                      {' '}
                      <i className="fa fa-thumbs-down fa-2x " />
                      {' '}
                      {article.article.dislikes}
                    </div>
                  )}
                    </div>
                  </div>
                  <div />
                </div>
              </div>
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
  notFetching: PropTypes.bool.isRequired,
  article: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  article: state.article.article,
  notFetching: state.article.notFetching,
});

export default connect(mapStateToProps, { getSingleArticle })(SingleArticle);
