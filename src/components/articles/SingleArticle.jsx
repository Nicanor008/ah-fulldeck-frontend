import React, { Component } from "react";

import ReactHtmlParser from "react-html-parser";
import { connect } from "react-redux";
import { getSingleArticle } from "../../actions/articleActions";

import pen from "../../assets/images/pen.jpg";

class SingleArticle extends Component {
  state = {
    fetched: false,
    article: {}
  };
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.getSingleArticle(slug);
  }

  render() {
    const { notFetching, article } = this.props;
    return (
      <div>
        {notFetching && (
          <div>
            <div className="container mt-3">
              <div className="container card border-0 bg-light">
                <div className="card-title border-0 bg-light">
                  <img
                    src={article.article.author.image}
                    alt="userimage"
                    className="logo img-fluid rounded"
                  />
                  <p className="d-inline text-muted ml-2">
                    <strong>
                      {article.article.author.username}
                      <span
                        className="ml-2 text-secondary-10"
                        style={{ fontFamily: "Courier New" }}
                      >
                        {new Date(article.article.created_at).toDateString()}
                      </span>
                    </strong>
                  </p>

                  <h2 className="d-inline text-center pl-4">
                    <strong>{article.article.title}</strong>
                  </h2>
                  <p className="card-subtitle mb-2 " />
                </div>
                <div />

                <center>
                  <img
                    src={pen}
                    alt="logo"
                    className="img-fluid"
                    style={{ height: "350px", width: "80%" }}
                  />
                </center>
                <div className="card-text border-0 bg-light text-muted mt-2">
                  {article.article.description}
                </div>
                <div className="card-text border-0 bg-light mb-4 mt-2">
                  {ReactHtmlParser(article.article.body)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state =>
  // console.log(state.hello.notFetching)
  ({
    article: state.article.article,
    notFetching: state.article.notFetching
  });

export default connect(
  mapStateToProps,
  { getSingleArticle }
)(SingleArticle);
