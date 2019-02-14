import React, { Component } from "react";
import { connect } from "react-redux";

import Article from "./Article";
import { getAllArticles } from "../../actions/articleActions";
import TitleCapture from "../banner";

class AllArticles extends Component {
  state = {
    fetched: false
  };

  componentDidMount() {
    this.props.getAllArticles();
  }

  render() {
    const { notFetching, articles } = this.props;
    return (
      <div>
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

const mapStateToProps = state => ({
  articles: state.articles.articles,
  notFetching: state.articles.notFetching
});

export default connect(
  mapStateToProps,
  { getAllArticles }
)(AllArticles);
