import jwt from 'jsonwebtoken';
import cookies from 'next-cookies';

const { JTW_KEY } = process.env;

export function encode(value) {
  const validUntil = new Date();
  validUntil.setMinutes(validUntil.getMinutes() + 5);

  const data = { data: value, validUntil };
  return jwt.sign({ data, validUntil }, JTW_KEY);
}

export function decode(token) {
  const data = jwt.decode(token, process.env.JTW_KEY);
  if (!data) return false;

  const timeLeft = data.validUntil - new Date();
  if (timeLeft <= 0) return false;

  return data.data;
}

export function getLoggedInUser(ctx) {
  const { token } = cookies(ctx);
  if (!token) return {};

  const user = decode(token);
  if (!user) return {};

  return { user };
}
