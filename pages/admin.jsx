import React, { useEffect } from 'react';
import PropTypes from 'proptypes';
import jwt from 'jsonwebtoken';
import cookies from 'next-cookies';

function Admin({ user }) {
  useEffect(() => {
    if (!user) location.href = '/admin/login';
  });

  return (
    <div className="admin-page">
      <h1>Admin</h1>
    </div>
  );
}

Admin.getInitialProps = (ctx) => {
  const { token } = cookies(ctx);
  if (!token) return {};

  const user = jwt.decode(token, process.env.JWT_TOKEN);
  if (!user) return {};

  const timeLeft = user.validUntil - new Date();
  if (timeLeft <= 0) return {};

  return { user: user.email };
};

Admin.propTypes = {
  user: PropTypes.string,
};

export default Admin;
