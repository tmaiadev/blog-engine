import React from 'react';
import PropTypes from 'prop-types';

function FocusTrap({ onFocus }) {
  return (
    <span
      className="focus-trap"
      tabIndex="0"
      onFocus={onFocus}
    >
      <style jsx>
        {`
          .focus-trap {
            display: block;
            width: 1px;
            height: 1px;
            position: absolute;
            top: 0px;
            left: 0px;
            opacity: 0;
            pointer-events: none;
          }  
        `}
      </style>
    </span>
  );
}

FocusTrap.propTypes = {
  onFocus: PropTypes.func.isRequired,
};

export default FocusTrap;
