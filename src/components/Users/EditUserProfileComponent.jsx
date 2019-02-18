import React, { Component } from "react";
import {
  getUserProfile,
  editUserProfile
} from "../../actions/Profile/userProfileAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";
import uploader from "../../assets/Uploader";
import NotFound from "../layout/NotFound";
import launchToast from "../../helpers/toaster";
import NavBar from "../layout/Navbar";
import ReactCrop from "react-image-crop";
import "react-image-crop/lib/ReactCrop.scss";
import {
  image64toCanvasRef,
  base64StringtoFile,
  extractImageFileExtensionFromBase64
} from "../../assets/imageHandler";

class EditUserProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.imagePreviewCanvasRef = React.createRef();
    this.state = {
      fetched: false,
      bio: "",
      image: "",
      uploadedImage: null,
      crop: {
        x: 10,
        y: 10,
        width: 80,
        height: 80
      }
    };
  }
  componentDidMount() {
    const { getUserProfile, match } = this.props;
    const { username } = match.params;
    getUserProfile(username).then(() => {
      this.setState({
        fetched: true,
        username: this.props.profile.profile.username,
        image: this.props.profile.profile.image,
        bio: this.props.profile.profile.bio
      });
    });
  }
  componentDidUpdate(pevProps) {
    const { history, profile } = this.props;
    if (!pevProps.profile.updated && profile.profile.updated) {
      if (profile.profile.updated) {
        history.push(`/profile/${profile.profile.username}`);
      }
    }
  }
  handleChange = event => {
    this.setState({ bio: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();

    const { bio, image } = this.state;

    const { username } = this.props.match.params;

    const newUserData = {
      bio,
      image
    };

    this.props.editUserProfile(username, newUserData);
  };

  handleImageSrc = () => {
    const file = document.querySelector("input[type=file]").files[0];
    const myFileReader = new FileReader();
    myFileReader.addEventListener(
      "load",
      () => {
        this.setState({ uploadedImage: myFileReader.result });
      },
      false
    );
    if (file) {
      myFileReader.readAsDataURL(file);
    }
  };
  onCropChange = (crop, pixelCrop) => {
    this.setState({ crop });
    const canvasRef = this.imagePreviewCanvasRef.current;
    const { uploadedImage } = this.state;
    image64toCanvasRef(canvasRef, uploadedImage, pixelCrop);
  };
  handleSave = event => {
    event.preventDefault();
    const { uploadedImage } = this.state;
    if (uploadedImage) {
      const canvasRef = this.imagePreviewCanvasRef.current;
      const fileExtension = extractImageFileExtensionFromBase64(uploadedImage);
      const imageData64 = canvasRef.toDataURL("image/" + fileExtension);
      const fileName = "profile-photo." + fileExtension;
      const selectedFile = base64StringtoFile(imageData64, fileName);
      this.setState({ uploadedImage: selectedFile });
      launchToast(
        "Uploading Image....",
        "toastSuccess",
        "descSuccess",
        "success"
      );
      uploader({ image: this.state.uploadedImage })
        .catch(err => console.log(err.request))
        .then(res => {
          if (res) {
            const image = res.data;
            this.setState({ image: image.secure_url });
            this.handleClearToDefault();
          }
        });
      this.handleClearToDefault();
    }
  };
  handleClearToDefault = event => {
    if (event) {
      event.preventDefault();
    }
    this.setState({
      uploadedImage: null,
      crop: {
        aspect: 1 / 1,
        x: 10,
        y: 10,
        width: 80,
        height: 80
      }
    });
  };
  render() {
    if (!this.state.fetched) {
      return <Loader />;
    }
    if (this.props.profile.profile.errors) {
      return <NotFound />;
    } else {
      const { image, username, bio, crop, uploadedImage } = this.state;
      return (
        <React.Fragment>
          <NavBar />
          <div>
            <div className="container bg-light bootstrap snippets">
              <div className="row">
                <div className="col-md-12 col-sm-9 border border-dark rounded mt-2">
                  <form
                    onSubmit={this.handleSubmit}
                    className="form-horizontal m-3"
                  >
                    <div>
                      <div className="panel-body text-center upload-img">
                        <img
                          className="user-image"
                          src={image}
                          alt={username}
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                        />
                        <div>
                          <button
                            type="button"
                            className="btn btn-outline-success btn-sm mt-2"
                            data-toggle="modal"
                            data-target="#exampleModalCenter"
                            onClick={this.handleClearToDefault}
                          >
                            Upload
                          </button>
                        </div>
                        <div
                          className="modal fade"
                          id="exampleModalCenter"
                          tabIndex="-1"
                          role="dialog"
                          aria-labelledby="exampleModalCenterTitle"
                          aria-hidden="true"
                        >
                          <div
                            className="modal-dialog modal-dialog-centered"
                            role="document"
                          >
                            <div className="modal-content">
                              <div className="modal-header text-center">
                                <h5
                                  className="modal-title w-100"
                                  id="exampleModalLongTitle"
                                >
                                  Upload another profile picture
                                </h5>
                                <button
                                  type="button"
                                  className="close"
                                  style={{ outline: "none" }}
                                  data-dismiss="modal"
                                  aria-label="Close"
                                  onClick={this.handleClearToDefault}
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <div>
                                  <input
                                  className="px-2 mx-auto"
                                    type="file"
                                    onChange={this.handleImageSrc}
                                  />
                                </div>
                                {uploadedImage && (
                                  <div>
                                    <ReactCrop
                                      src={uploadedImage}
                                      crop={crop}
                                      onChange={this.onCropChange}
                                    />
                                    <canvas
                                      style={{ height: "0%", width: "0%" }}
                                      ref={this.imagePreviewCanvasRef}
                                    />
                                  </div>
                                )}
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-outline-success"
                                  onClick={this.handleSave}
                                  data-dismiss="modal"
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-outline-danger"
                                  data-dismiss="modal"
                                  onClick={this.handleClearToDefault}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" w-75">
                      <div className="panel-heading pl-0">
                        <h4 className="panel-title font-weight-bold">
                          User info
                        </h4>
                      </div>
                    </div>
                    <div className="panel-body content">
                      <div className="form-group">
                        <label className="col-sm-2 control-label border-0 border-bottom text-left">
                          <span className="font-weight-light">Username: </span>{" "}
                          {username}
                        </label>
                      </div>
                      <div className="form-group">
                        <label className="col-md-3 control-label font-weight-bold ml-4 text-left pl-1">
                          Bio
                        </label>
                        <div className="col-sm-12">
                          <textarea
                            rows="3"
                            name="bio"
                            className="form-control"
                            placeholder="Something interesting about yourself..."
                            defaultValue={bio}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-sm-10">
                          <button
                            type="submit"
                            className="btn btn-outline-success mr-3 float-left"
                          >
                            Save
                          </button>

                          <Link
                            to={`/profile/${
                              username === "" ? { username } : username
                            }`}
                          >
                            <button
                              type="reset"
                              className="btn btn-outline-danger mx-3"
                            >
                              Cancel
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}
EditUserProfileComponent.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object,
  match: PropTypes.object
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getUserProfile, editUserProfile }
)(EditUserProfileComponent);
