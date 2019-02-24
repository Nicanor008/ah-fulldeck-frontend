import React from 'react';
import { Link } from 'react-router-dom';

import pen from '../../assets/images/pen.jpg';
import AllArticlesDisplayRating from '../rating/AllArticlesDisplayRating';

// eslint-disable-next-line import/prefer-default-export
const Article = article => (
  <div className="row">
    <div className="col-md-9 card bg-light border border-dark p-1 mb-3 mx-auto">
      <Link
        to={{ pathname: `/${article.slug}`, article: { ...article } }}
        className="link-nostyle"
        style={{ color: 'black', textDecoration: 'none' }}
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
              <img src={pen} alt="logo" className="logo w-100 h-100 mx-3" />
            </div>
            <div className="col col-md-5">{article.description}</div>
          </div>
        </div>
      </Link>
      <hr />
      <div className="likecontainer">
        <i className="fa fa-thumbs-up fa-2x " /> {article.like}{' '}
        &nbsp;&nbsp;&nbsp; <i className="fa fa-thumbs-down fa-2x " />{' '}
        {article.dislike}
      </div>
      <AllArticlesDisplayRating {...article} />
    </div>
  </div>
);

export default Article;
