import jwt from 'jsonwebtoken';

let nFailedAttempts = 0;

const failedAttemptsDelay = () => new Promise(
  (resolve) => setTimeout(resolve, nFailedAttempts * 1000)
);

export default async function(req, res) {
  try {
    const { email, password } = JSON.parse(req.body);
    const { ADMIN_EMAIL, ADMIN_PASSWORD, JTW_KEY } = process.env;

    await failedAttemptsDelay();

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      nFailedAttempts++;
      throw {
        code: 400,
        message: 'Invalid credentials',
      };
    }

    nFailedAttempts = 0;

    const validUntil = new Date();
    validUntil.setMinutes(validUntil.getMinutes() + 5);

    const token = jwt.sign({ email, validUntil }, JTW_KEY);
    
    res.setHeader('Content-Type', 'application/json');
    res.send({ token });
  } catch (e) {
    res
      .status(e.code || 500)
      .send(e.message || 'Internal error');
  }
}