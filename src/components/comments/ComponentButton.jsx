/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

const ComponentButton = ({
  id,
  name,
  onClick,
  clazz,
  type,
  value,
  datatoggle,
  datatarget,
}) => (
  <div className="button-comments">
    <div className="buttons-float">
      <button
        id={id}
        name={name}
        type={type}
        onClick={onClick}
        className={clazz}
        data-toggle={datatoggle}
        data-target={datatarget}
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
  onClick: PropTypes.func,
  clazz: PropTypes.string,
  datatoggle: PropTypes.string,
  datatarget: PropTypes.string,
};

export default ComponentButton;
