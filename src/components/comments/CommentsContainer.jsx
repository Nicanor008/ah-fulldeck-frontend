/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/commentsActions';
import Comments from './Comments';
import launchToast from '../../helpers/toaster';

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

  onSubmit = () => {
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
  };

  onChange = e => this.setState({ comments: e.target.value, disabled: false });

  checkUser = (e) => {
    e.preventDefault();
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      this.onSubmit();
    } else {
      launchToast('Login to comment on this article', 'toastFail', 'descFail', 'fail');
      this.props.history.push('/login');
    }
  }

  render() {
    const { comments, errors } = this.state;
    const {
      comments: {
        comments: {
          count,
        },
      },
    } = this.props;
    return (
      <div>
        <div className="row">
          <div className=" col-md-10 text-center">
            <h1>Comments</h1>
          </div>
          <div className="col-md-2 comments-count mt-3 text-center font-weight-bolder">
            {/* eslint-disable-next-line react/prop-types */}
            {count}
            <div className="d-inline ml-2">Comments</div>
          </div>
        </div>
        <hr />
        <Comments {...this.props} />
        <div className="container">
          <div className="row">
            <form>
              <div className="form-group col-sm-12">
                <textarea className="form-control" rows="5" id="comment" value={comments} placeholder="Enter your comments here" onChange={this.onChange} errors={errors.comments} />
              </div>
              <div className="col-sm-offset-6 col-sm-6">
                <button type="submit" aria-hidden="true" onClick={e => this.checkUser(e)} disabled={this.state.disabled} value="Reset Password" className="btn btn-success btn-block form-control" style={{ height: '40px', width: '30%', float: 'right' }}>
                  Add Comment
                </button>
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CommentsContainer.propTypes = {
  addComment: PropTypes.func.isRequired,
  slug: PropTypes.string,
  match: PropTypes.object,
  comments: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  comments: state.comment,
  disabled: state.comment.disabled,
});

export default connect(
  mapStateToProps,
  { addComment },
)(CommentsContainer);
