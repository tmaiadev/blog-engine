import React from 'react';
import PropTypes from 'proptypes';
import Dashboard from '../components/dashboard';
import { getLoggedInUser } from '../libs/auth';

function Admin({ user }) {
  return (
    <Dashboard user={user}>
      ADMIN
    </Dashboard>
  );
}

Admin.getInitialProps = getLoggedInUser;

Admin.propTypes = {
  user: PropTypes.string,
};

export default Admin;
