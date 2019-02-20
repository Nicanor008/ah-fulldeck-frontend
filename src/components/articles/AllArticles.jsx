import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Article from './Article';
import { getAllArticles } from '../../actions/articleActions';
import TitleCapture from '../banner';
import NavBar from '../layout/Navbar';

class AllArticles extends Component {
  componentDidMount() {
    this.props.getAllArticles();
  }

  render() {
    const { notFetching, articles } = this.props;
    return (
      <div>
        <NavBar />
        <TitleCapture />
        <div className="container mt-3">
          <div className="container card border-0 bg-light">
            {notFetching && (
              <div>
                {articles.article.results.map(article => (
                  <Article
                    title={article.title}
                    description={article.description}
                    author={article.author.username}
                    key={article.slug}
                    slug={article.slug}
                    created_at={new Date(article.created_at).toDateString()}
                  />
                ))}
              </div>
            )}
            <div className="card-footer border-0 bg-light">Footer</div>
          </div>
        </div>
      </div>
    );
  }
}
AllArticles.propTypes = {
  notFetching: PropTypes.bool.isRequired,
  articles: PropTypes.object.isRequired,
  getAllArticles: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  articles: state.articles.articles,
  notFetching: state.articles.notFetching,
});

export default connect(
  mapStateToProps,
  { getAllArticles },
)(AllArticles);
