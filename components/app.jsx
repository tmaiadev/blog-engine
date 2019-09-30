import React from 'react';
import PropTypes from 'prop-types';

function App({ children }) {
  return (
    <div className="app">
      {children}
      <style jsx>
        {`
          .app {
            --primary-color: #274472;
            --secondary-color: #5885AF;
            --tertiary-color: #41729F;
            --quartenary-color: #C3E0E5;
            --accent-color: #FAD02C;
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
