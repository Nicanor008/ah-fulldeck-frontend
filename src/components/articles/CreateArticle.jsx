import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CKEditor from 'react-ckeditor-component';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import validateInput from '../../helpers/validators';
import { postArticle } from '../../actions/articleActions';
import NavBar from '../navBar';

class CreateArticle extends Component {
  state = {
    title: '',
    body: '',
    description: '',
    errors: {},
  };

  postArticle = () => {
    const { title, body, description } = this.state;
    const { errors, isValid } = validateInput({ title, body, description });
    if (!isValid) {
      this.setState({ errors });
    }

    const payload = {
      article: {
        title: this.state.title,
        body: this.state.body,
        description: this.state.description,
      },
    };
    this.props.postArticle(payload);
  };

  onHandleEditorChange = event => {
    const content = event.editor.getData();
    this.setState({
      body: content,
    });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="CreateArticle">
          <div className="container mt-3">
            <div className="row">
              <div className="container card border-0 bg-light">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-11">
                      <input
                        type="text"
                        className="form-control bg-light border-0"
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
                        className="btn btn-success mb-2"
                        onClick={this.postArticle}
                      >
                        Publish
                      </button>
                    </div>
                  </div>
                  <input
                    type="text"
                    className="form-control bg-light border-0 mb-2 mt-1"
                    placeholder="Article description"
                    onChange={event => this.setState({ description: event.target.value })
                    }
                    value={this.state.description}
                  />
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
                <div className="card-footer border-0 bg-light">
                  Add Tags here
                </div>
              </div>
            </div>
          </div>
          {this.props.slug && <Redirect to="/" />}
        </div>
      </React.Fragment>
    );
  }
}
CreateArticle.propTypes = {
  postArticle: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
};
const mapStateToProps = state => ({
  createArticle: state.articles,
  slug: state.articles.slug,
});

export default connect(
  mapStateToProps,
  { postArticle },
)(CreateArticle);
