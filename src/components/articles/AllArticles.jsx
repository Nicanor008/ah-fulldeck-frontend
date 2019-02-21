import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import PropTypes from 'prop-types';
import Article from './Article';
import { getAllArticles } from '../../actions/articleActions';
import TitleCapture from '../banner';
import NavBar from '../layout/Navbar';
import config from '../../config';
import Loader from '../layout/Loader';

class AllArticles extends Component {
  constructor() {
    super();
    this.state = {
      page_size: config.PAGE_SIZE,
      fetched: false,
      activePage: 1,
    };
  }

  componentDidMount() {
    this.props.getAllArticles(1, this.state.page_size).then(() => {
      this.setState({
        fetched: true,
      });
    });
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  handlePageChange = pageNumber => {
    this.props.getAllArticles(pageNumber, this.state.page_size).then(() => {
      this.setState({ activePage: pageNumber });
    });
  };

  render() {
    if (!this.state.fetched) {
      return <Loader />;
    }
    const { notFetching, articles } = this.props;
    return (
      <div>
        <NavBar />
        <TitleCapture />
        <div className="container mt-3">
          <div className="container card border-0 bg-light">
            {notFetching && (
              <div>
                {articles.article.results.map((article) => (
                  <Article
                    title={article.title}
                    description={article.description}
                    author={article.author}
                    key={article.slug}
                    slug={article.slug}
                    created_at={new Date(article.created_at).toDateString()}
                    like={article.likes}
                    dislike={article.dislikes}
                  />
                ))}
              </div>
            )}
            {articles.article.count > config.PAGE_SIZE && (
              <div className="mx-auto">
                <Pagination
                  prevPageText="prev"
                  nextPageText="next"
                  firstPageText="first"
                  lastPageText="last"
                  activePage={this.state.activePage}
                  itemsCountPerPage={config.PAGE_SIZE}
                  totalItemsCount={articles.article.count}
                  pageRangeDisplayed={Math.ceil(articles.article.count / config.PAGE_SIZE)}
                  onChange={this.handlePageChange}
                />
              </div>
            )}
            <div className="card-footer border-0 bg-light">Footer</div>
          </div>
        </div>
      </div>
    );
  }
}
AllArticles.defaultProps = {
  articles: {},
};
AllArticles.propTypes = {
  getAllArticles: PropTypes.func.isRequired,
  articles: PropTypes.object,
  notFetching: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  articles: state.articles.articles,
  notFetching: state.articles.notFetching,
});

export default connect(mapStateToProps, { getAllArticles })(AllArticles);
