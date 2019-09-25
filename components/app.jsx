import React from 'react';
import PropTypes from 'prop-types';

function App({ children }) {
  return (
    <div className="app">
      {children}
      <style jsx>
        {`
          .app {
            --primary-color: #007aff;
          }
          * {
            font-family: Arial;
            font-size: 16px;
          }
        `}
      </style>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
