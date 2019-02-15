import React from 'react';
import PropTypes from 'prop-types';


const SocialButton = (props) => {
  const {
    provider, providerName, type, className, buttonClass,
    fetchSocialData,
  } = props;
  return (
    <button
      type="button"
      className={`btn ${buttonClass}`}
      onClick={() => fetchSocialData(provider, providerName, type)}
    >
      <i className={`fab ${className}`}/>
    </button>
  );
};
SocialButton.propTypes = {
  provider: PropTypes.string,
  providerName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  buttonClass: PropTypes.string.isRequired,
  fetchSocialData: PropTypes.func.isRequired,
};

SocialButton.defaultProps = {
  provider: null,
};
export default SocialButton;
