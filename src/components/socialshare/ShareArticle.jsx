import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SocialButton from './ShareContainer';

// eslint-disable-next-line react/prefer-stateless-function
class ShareArticle extends Component {
  render() {
    const { title } = this.props.article.article;
    const facebookLink = `https://www.facebook.com/sharer.php?u=${window.location.href}`;
    const twitterLink = `https://twitter.com/intent/tweet?url=${window.location.href}&text=Check out this amazing article ${title} `;
    const mailLink = `mailto:?Subject=An%20article%20has%20been%20shared%20with%20you%20&Body=${`${title}  ${window.location.href}`}`;
    return (
      <div className="btn-group" role="group">
        <span className="text-danger ml-2">Share this article</span>
        &nbsp;&nbsp;&nbsp;
        <SocialButton
          icon="faFacebook"
          text="facebook"
          link={facebookLink}
        />
        <SocialButton
          icon="faTwitter"
          text="twitter"
          link={twitterLink}
        />
        <SocialButton
          icon="faEnvelope"
          text="mail"
          link={mailLink}
        />
      </div>
    );
  }
}

ShareArticle.propTypes = {
  title: PropTypes.string.isRequired,
  article: PropTypes.object.isRequired,

};

export default ShareArticle;
