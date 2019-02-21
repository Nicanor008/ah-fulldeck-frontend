/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

const ComponentButton = ({
  id,
  name,
  type,
  value,
}) => (
  <div className="button-comments">
    <div className="buttons-float">
      <button
        id={id}
        type={type}
        className={name}
      />
      {value}
    </div>
  </div>
);

ComponentButton.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
};

export default ComponentButton;
