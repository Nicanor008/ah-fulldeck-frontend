/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/commentsActions';
import Comments from './Comments';
import Auth from '../auth/Auth';

class CommentsContainer extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      comments: '',
      disabled: true,
      errors: {},
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const { comments } = this.state;

    //  Check for errors

    if (comments === '') {
      this.setState({ errors: { comments: 'Comments are required' } });
      return;
    }
    const { slug } = this.props.match.params;
    const newComments = {
      comment: {
        body: comments,
      },
    };

    this.props.addComment(newComments, slug);

    // clear state
    this.setState({
      comments: '',
      errors: {},
    });

    window.location.reload();
  };

  onChange = e => this.setState({ comments: e.target.value, disabled: false });

  render() {
    const { comments, errors } = this.state;
    return (
      <div>
        <h1>Comments</h1>
        <hr />
        <Comments {...this.props} />
        {Auth.isAuthenticated && (
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <textarea className="form-control" rows="5" id="comment" value={comments} placeholder="Enter your comments here" onChange={this.onChange} errors={errors.comments} />
            </div>
            <button type="submit" aria-hidden="true" disabled={this.state.disabled} value="Reset Password" className="btn btn-success btn-block" style={{ height: '40px', width: '30%', float: 'right' }}>
            Add Comment
            </button>
          </form>
        )}
      </div>
    );
  }
}

CommentsContainer.propTypes = {
  addComment: PropTypes.func.isRequired,
  slug: PropTypes.string,
  match: PropTypes.string,
};

const mapStateToProps = state => ({
  comments: state.comment,
  disabled: state.comment.disabled,
});

export default connect(
  mapStateToProps,
  { addComment },
)(CommentsContainer);
