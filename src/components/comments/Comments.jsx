import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Comment from './Comment';
import { getComments } from '../../actions/commentsActions';
import Loader from '../layout/Loader';

export class Comments extends Component {
  constructor() {
    super();
    this.state = {
      fetched: false,
    };
  }

  componentDidMount() {
    const { slug } = this.props.match.params;
    this.props.getComments(slug).then(() => {
      this.setState({ fetched: true });
    });
  }

  render() {
    if (!this.state.fetched) {
      return <Loader />;
    }

    const { comments, article } = this.props;
    return (
      <React.Fragment>
        {comments.comments.map(comment => (
          <Comment key={comment.id} comment={comment} article={article} />
        ))}
      </React.Fragment>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.object.isRequired,
  getComments: PropTypes.func.isRequired,
  article: PropTypes.object,
  match: PropTypes.object,
  slug: PropTypes.string,
};

const mapStateToProps = state => ({
  comments: state.comment.comments,
});

export default connect(
  mapStateToProps,
  { getComments },
)(Comments);
