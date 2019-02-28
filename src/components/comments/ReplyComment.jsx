/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ComponentButton from './ComponentButton';
// import launchToast from '../../helpers/toaster';
import { getComment, replyComment } from '../../actions/commentsActions';

import Auth from '../auth/Auth';

class ReplyComment extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      disabled: true,
      errors: {},
      body: '',
    };
  }

  //   componentWillReceiveProps(nextProps) {
  //     const { body } = nextProps.comment;
  //     this.setState({
  //       // eslint-disable-next-line react/no-unused-state
  //       body,
  //     });
  //   }

  handleGetComment = (e, slug, id) => {
    e.preventDefault();
    this.props.getComment(slug, id).then(() => {
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { body } = this.state;

    const { slug, id } = this.props;
    const payload = {
      comment: {
        body,
      },
    };

    this.props.replyComment(slug, id, payload);

    // clear state
    this.setState({
      body: '',
      errors: {},
    });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value, disabled: false });

  render() {
    const { body, errors } = this.state;
    const { slug, id } = this.props;
    return (
      <div>
        <ComponentButton
          type="submit"
          id="reply"
          clazz="fas fa-reply"
          value="Reply"
          onClick={e => this.handleGetComment(e, slug, id)}
          datatoggle="modal"
          datatarget="#replyModalCenter"
        />
        {Auth.isAuthenticated && (
          <div
            className="modal fade"
            id="replyModalCenter"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    Reply to this comment
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <textarea
                        name="body"
                        className="form-control"
                        rows="5"
                        id="comment"
                        placeholder="Reply to the comment here"
                        value={body}
                        onChange={this.onChange}
                        errors={errors.comments}
                      />
                    </div>
                    <button
                      type="submit"
                      aria-hidden="true"
                      disabled={this.state.disabled}
                      value="Reply Comment"
                      className="btn btn-success btn-block"
                      style={{ height: '40px', width: '30%', float: 'right' }}
                    >
                      Reply Comment
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

ReplyComment.propTypes = {
  getComment: PropTypes.func.isRequired,
  replyComment: PropTypes.func.isRequired,
  body: PropTypes.object,
  slug: PropTypes.string,
  id: PropTypes.string,
  comment: PropTypes.object,
};

const mapStateToProps = state => ({
  comment: state.comment.comment,
  disabled: state.comment.disabled,
});

export default connect(
  mapStateToProps,
  { getComment, replyComment },
)(ReplyComment);
