import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function Button({
  type,
  id,
  onClick,
  disabled,
  children,
  'aria-label': ariaLabel,
}) {
  return (
    <Fragment>
      <button
        type={type}
        className={type}
        id={id}
        onClick={onClick}
        aria-label={ariaLabel}
        className="button"
        disabled={disabled}
      >
        {children}
      </button>
      <style jsx>
        {`
          .button {
            padding: 8px 16px;
            background-color: var(--primary-color);
            color: #FFF;
            border-radius: 4px;
            border: none;
            cursor: pointer;
          }

          .button:disabled {
            background-color: #CCC;
            color: #717171;
            cursor: not-allowed;
          }
        `}
      </style>
    </Fragment>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  id: PropTypes.string,
  disabled: PropTypes.bool,
  'aria-label': PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  id: undefined,
  disabled: false,
  'aria-label': undefined,
};

export default Button;
