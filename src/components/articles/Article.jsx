import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/articles.scss';

import pen from '../../assets/images/pen.jpg';
import AllArticlesDisplayRating from '../rating/AllArticlesDisplayRating';
import '../../assets/styles/Likes.scss';

// eslint-disable-next-line import/prefer-default-export
const Article = article => (
  <div className="row">
    <div className="col-md-9 card bg-light border border-dark p-1 mb-3 mx-auto">
      <Link
        to={{ pathname: `/article/${article.slug}`, article: { ...article } }}
        className="link-nostyle"
      >
        <div className="card-header bg-transparent">
          <div className="row">
            <div className="col col-sm-1">
              <img
                src={article.author.image}
                alt=""
                className="rounded-circle w-75 border ml-2"
              />
            </div>
            <div>
              <span className="font-weight-bold">
                {article.author.username}
              </span>
              <br />
              <span>{article.created_at}</span>
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="card-text font-weight-bold text-center ml-4">
            {article.title}
          </div>
          <div className="row">
            <div className="col col-md-5">
              {(article.image_url && (
                <img
                  src={article.image_url}
                  alt="logo"
                  className="logo w-100 h-100 mx-3"
                />
              )) || (
                  <img src={pen} alt="logo" className="logo w-100 h-100 mx-3" />
                )}
            </div>
            <div className="col col-md-5">{article.description}</div>
          </div>
        </div>
      </Link>
      <hr />
      <div className="row likecontainer">
        <div className="col-sm-2">
          <i className="fa fa-thumbs-up fa-2x thumbsup" id="thumbsup" /> {article.like}{' '}
          &nbsp;&nbsp;&nbsp; <i className="fa fa-thumbs-down fa-2x thumbsdown" id="thumbsdown" />{' '}
          {article.dislike}
        </div>
        <div className="col-sm-2">
          <AllArticlesDisplayRating {...article} />
        </div>
        <div className="article-views">
          <div className="article-views">
            <i className="glyphicon glyphicon-eye-open d-inline text-primary"></i>
            <div className="views-count pl-2 d-inline">
              {article.views} 
            </div>  
            <div className="pl-1 d-inline font-weight-normal">
              Views
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Article;
