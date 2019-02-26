/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import reportArticleAction from '../../../actions/Report/reportArticleAction';

class ReportArticle extends Component {
  state = {
    report: '',
    disabled: true,
    errors: {},
    modal: '',
  };

  componentDidUpdate() {
    if (this.props.reporting.success) {
      document.getElementById('close-btn').click();
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const { report } = this.state;

    // Check For Errors
    if (report === '') {
      this.setState({ errors: { report: 'report is required' } });
      return;
    }

    const newReport = {
      report: {
        report_msg: report,
      },
    };
    const { slug } = this.props.match.params;
    this.props.reportArticleAction(slug, newReport);
    this.setState({ errors: {} });
  };

  onChange = e =>
    this.setState({ [e.target.name]: e.target.value, disabled: false });

  render() {
    const { report, errors } = this.state;
    return (
      <React.Fragment>
        <button
          type="button"
          className="btn btn-outline-danger"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          <i className="fa fa-flag" aria-hidden="true" />
          &nbsp; Report
        </button>

        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Please state the reason for reporting this Article
                </h5>
                <button
                  id="close-btn"
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
                  <div className="col-md-8">
                    <div className="form-group">
                      <textarea
                        name="report"
                        value={report}
                        className="form-control"
                        rows="5"
                        id="comment"
                        placeholder="Enter your reason here ..."
                        onChange={this.onChange}
                        errors={errors.report}
                      />
                      <div className="invalid-feedback">{errors.report}</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="btn-group float-right mt-2" role="group">
                      <button
                        type="submit"
                        aria-hidden="true"
                        className="btn btn-danger"
                        disabled={this.state.disabled}
                      >
                        <i className="fa fa-flag" aria-hidden="true" />
                        &nbsp; Report
                        {this.props.report.isLoading && (
                          <i className="fas fa-spinner fa-spin ml-2" />
                        )}
                      </button>
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

ReportArticle.propTypes = {
  report: PropTypes.object,
  reporting: PropTypes.object,
  isLoading: PropTypes.bool,
  slug: PropTypes.string,
  match: PropTypes.object,
  reportArticleAction: PropTypes.func,
};
const mapStateToProps = state => ({
  report: state.report,
  reporting: state.report.reporting,
  disabled: state.report.disabled,
});
export default connect(
  mapStateToProps,
  { reportArticleAction },
)(ReportArticle);
