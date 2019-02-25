import React, { Component } from 'react';
import { connect } from 'react-redux';
import CKEditor from 'react-ckeditor-component';
import PropTypes from 'prop-types';

import validateInput from '../../helpers/validators';
import { getSingleArticle, editArticle } from '../../actions/articleActions';
import launchToast from '../../helpers/toaster';
import fileHandler from '../../helpers/fileHandler';
import '../../assets/styles/articles.scss';

class EditArticle extends Component {
  state = {
    title: '',
    description: '',
    image_url: '',
    body: '',
    errors: {},
  };

  // eslint-disable-next-line react/sort-comp
  componentWillReceiveProps(nextProps) {
    const {
      // eslint-disable-next-line camelcase
      title, description, image_url, body,
    } = nextProps.article.article;
    this.setState({
      title,
      description,
      image_url,
      body,
    });
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const slug = this.props.match.params.slug;
    this.props.getSingleArticle(slug);
  }

  editArticle = () => {
    const {
      // eslint-disable-next-line camelcase
      title, body, description, image_url,
    } = this.state;
    const { errors, isValid } = validateInput({ title, body, description });
    if (!isValid) {
      this.setState({ errors });
    }

    // eslint-disable-next-line react/prop-types
    const slug = this.props.match.params.slug;
    const payload = {
      article: {
        title,
        description,
        image_url,
        body,
      },
    };

    this.props.editArticle(payload, slug);
    this.forceUpdate();
    launchToast('Article Edited', 'toastSuccess', 'descSuccess', 'success');
    this.props.history.push('/');
  };

  onHandleEditorChange = event => {
    const content = event.editor.getData();
    this.setState({
      body: content,
    });
  };

  // eslint-disable-next-line react/prop-types
  cancelEditArticle = () => this.props.history.goBack();

  render() {
    const { notFetching } = this.props;
    return (
      <div className="CreateArticle">
        {notFetching && (
          <div className="container mt-3">
            <div className="row">
              <div className="container card border-0 bg-light">
                <div className="card-header bg-light card-title">
                  Edit Article
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-10">
                      <input
                        type="text"
                        className="form-control bg-white border-0 article-title mb-2"
                        placeholder="Title"
                        onChange={event => this.setState({ title: event.target.value })
                        }
                        value={this.state.title}
                      />
                      {this.state.errors.title && (
                        <span className="text-danger ml-3">
                          {this.state.errors.title}
                        </span>
                      )}
                    </div>
                    <div className="col-md-2 d-flex justify-content-end">
                      <button
                        type="button"
                        className="btn btn-danger mr-2"
                        onClick={this.cancelEditArticle}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={this.editArticle}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                  <input
                    type="text"
                    className="form-control bg-white border-0 mb-2 mt-1"
                    placeholder="Article description"
                    onChange={event => this.setState({ description: event.target.value })
                    }
                    value={this.state.description}
                  />
                  <label htmlFor="imageUpload" className="d-inline text-muted">
                    Upload an Image
                  </label>
                  <div className="panel-body upload-img">
                    <input
                      type="file"
                      className="form-control"
                      onChange={fileHandler}
                    />
                  </div>
                  <CKEditor
                    content={this.state.body}
                    events={{
                      change: this.onHandleEditorChange,
                    }}
                  />
                  {this.state.errors.body && (
                    <span className="text-danger ml-2">
                      {this.state.errors.body}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

EditArticle.propTypes = {
  article: PropTypes.object.isRequired,
  notFetching: PropTypes.bool.isRequired,
  editArticle: PropTypes.func.isRequired,
  getSingleArticle: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  article: state.article.article,
  notFetching: state.article.notFetching,
  articleEdit: state.articles.editArticle,
});

export default connect(
  mapStateToProps,
  { getSingleArticle, editArticle },
)(EditArticle);
