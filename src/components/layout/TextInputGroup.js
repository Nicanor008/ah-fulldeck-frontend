import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextInputGroup = ({
  name,
  placeholder,
  type,
  value,
  onChange,
  error,
  spin
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        name={name}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={!error ? placeholder : error}
        onChange={onChange}
        value={value}
        error={error}
        spin={spin}
      />
      {<div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextInputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  spin: PropTypes.symbol.isRequired,
  error: PropTypes.func
};

TextInputGroup.defaultsProps = {
  type: "text"
};
export default TextInputGroup;
