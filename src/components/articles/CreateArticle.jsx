import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CKEditor from 'react-ckeditor-component';
import { Redirect } from 'react-router-dom';
import validateInput from '../../helpers/validators';
import { postArticle } from '../../actions/articleActions';
import launchToast from '../../helpers/toaster';
import uploader from '../../assets/uploader';
import '../../assets/styles/articles.scss';

class CreateArticle extends Component {
  state = {
    title: '',
    description: '',
    image_url: '',
    body: '',
    errors: {},
  };

  postArticleButton = () => {
    const {
      // eslint-disable-next-line camelcase
      title,
      description,
      // eslint-disable-next-line camelcase
      image_url,
      body,
    } = this.state;
    const { errors, isValid } = validateInput({ title, body, description });
    if (!isValid) {
      this.setState({ errors });
    }

    const payload = {
      article: {
        title,
        description,
        image_url,
        body,
      },
    };

    // eslint-disable-next-line react/prop-types
    this.props.postArticle(payload);
    // launchToast('Article Created', 'toastSuccess', 'descSuccess', 'success');
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      slug: '',
      // eslint-disable-next-line react/no-unused-state
      edited: false,
    });
  };

  fileHandler = event => {
    const selectedFile = event.target.files[0];
    launchToast(
      'Uploading Image....',
      'toastSuccess',
      'descSuccess',
      'success',
    );
    uploader({ image: selectedFile })
      .then(res => this.setState({ image_url: res.data.secure_url }))
      // eslint-disable-next-line no-console
      .catch(err => console.log(err.request));
  };

  onHandleEditorChange = event => {
    const content = event.editor.getData();
    this.setState({
      body: content,
    });
  };

  render() {
    const { slug } = this.props;
    // return <BaseCreateEditArticle {...slug} />;
    return (
      <div className="CreateArticle">
        <div className="container mt-3">
          <div className="row">
            <div className="container card bg-light">
              <div className="card-header bg-light border-0 card-title">
                New Article
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-11">
                    <input
                      type="text"
                      className="form-control bg-white article-title mb-2"
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
                  <div className="col-md-1 d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-success mb-2 p-4"
                      onClick={this.postArticleButton}
                    >
                      Publish
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control bg-white mb-2 mt-1"
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
                    onChange={this.fileHandler}
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
              <div className="card-footer border-0 bg-light">Add Tags here</div>
            </div>
          </div>
        </div>
        {/* {slug && this.props.history.push(`/${slug}`)} */}
        {/* {slug && <Redirect to={`/${slug}`} />} */}
        {slug && <Redirect to="/" />}
      </div>
    );
  }
}

CreateArticle.propTypes = {
  slug: PropTypes.object.isRequired,
  postArticle: PropTypes.bool.isRequired,
};
const mapStateToProps = state => ({
  createArticle: state.articles,
  slug: state.articles.slug,
});

export default connect(
  mapStateToProps,
  { postArticle },
)(CreateArticle);
