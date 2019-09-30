import { encode } from '../../libs/auth';
import { InvalidCredentialError } from '../../constants/errors';

let nFailedAttempts = 0;

const failedAttemptsDelay = () => new Promise(
  (resolve) => setTimeout(resolve, nFailedAttempts * 1000),
);

export default async function (req, res) {
  try {
    const { email, password } = JSON.parse(req.body);
    const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

    await failedAttemptsDelay();

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      nFailedAttempts += 1;
      throw new InvalidCredentialError();
    }

    nFailedAttempts = 0;

    const token = encode(email);

    res.setHeader('Content-Type', 'application/json');
    res.send({ token });
  } catch (e) {
    res
      .status(e.code || 500)
      .send(e.message || 'Internal error');
  }
}
