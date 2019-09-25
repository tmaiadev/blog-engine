import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';

function AdminWrapper({ children, user }) {
  useEffect(() => {
    if (!user) location.href = "/admin";
  }, [user]);

  return children;
}

AdminWrapper.getInitialProps = (ctx) => {
  const { token } = cookies(ctx);

  if (!token) return { user: null };

  const { JWT_KEY } = process.env;
  const user = jwt.decode(token, JWT_KEY);

  if (!user) return { user: null };

  return { user };
};

AdminWrapper.propTypes = {
  children: PropTypes.node,
};

AdminWrapper.defaultProps = {
  children: null,
};

export default AdminWrapper;
