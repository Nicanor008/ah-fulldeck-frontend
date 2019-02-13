import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Input = ({ name, value, placeholder, type, onChange, error }) => {
	return (
		<div>
			<input
				type={type}
				name={name}
				className={classnames('form-control form-control-lg', {
					'is-invalid': error
				})}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

Input.prototype = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	error: PropTypes.string
};

Input.defaulfProps = {
	type: 'text'
};

export default Input;
