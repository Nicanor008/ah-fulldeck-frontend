import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/Socialshare.scss';

const SocialButton = (props) => {
  const { icon, text, link } = props;
  let iconDisplay;
  if (icon === 'faTwitter') {
    iconDisplay = faTwitter;
  } else if (icon === 'faFacebook') {
    iconDisplay = faFacebook;
  } else {
    iconDisplay = faEnvelope;
  }
  return (
    <a
      // eslint-disable-next-line react/jsx-no-target-blank
      target="_blank"
      href={link}
      className="btn btn-outline-primary"
      id="social-button"
    >
      <FontAwesomeIcon icon={iconDisplay} />
      &nbsp;&nbsp;&nbsp;
      {text}
    </a>
  );
};

export default SocialButton;

SocialButton.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
