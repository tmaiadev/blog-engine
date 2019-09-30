import React from 'react';
import PropTypes from 'prop-types';

function Input({
  type,
  id,
  name,
  label,
  required,
  disabled,
  onChange,
}) {
  return (
    <div className="input">
      <label
        className="input__label"
        htmlFor={id}
      >
        {label}
        <span aria-hidden="true">:</span>
      </label>
      <input
        type={type}
        id={id}
        name={name}
        required={required}
        disabled={disabled}
        className="input__input"
        onChange={onChange}
      />
      <style jsx>
        {`
          .input {
            display: grid;
          }
          .input__label {
            font-weight: bold;
            margin-bottom: 4px;
          }
          .input__input {
            height: 40px;
            border-radius: 4px;
            border: solid thin #CCC;
            padding: 0px 16px;
          }
        `}
      </style>
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  required: false,
  disabled: false,
  onChange: () => {},
};

export default Input;
