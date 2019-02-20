import React from 'react';
import { Link } from 'react-router-dom';

import pen from '../../assets/images/pen.jpg';

const Article = article => (
  <div className="row">
    <div className="col-md-8 card bg-light border-0 p-1">
      <Link
        to={{ pathname: `/${article.slug}`, article: { ...article } }}
        className="link-nostyle"
        style={{ color: 'black', textDecoration: 'none' }}
      >
        <div className="card-text font-weight-bold ml-3">{article.title}</div>
        <div className="card-body">
          <div className="d-inline mr-2">
            <img src={pen} alt="logo" className="logo" />
          </div>
          <div className="d-inline">{article.description}</div>
        </div>
      </Link>
      <div className="card-text text-muted ml-3">
        {article.author}&nbsp;&nbsp;&nbsp;{article.created_at}
      </div>
      <hr />
    </div>
  </div>
);

export default Article;
