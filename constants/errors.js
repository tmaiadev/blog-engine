export function InvalidCredentialError() {
  const error = new Error('Invalid Credentials');
  error.name = 'InvalidCredentialError';
  error.code = 400;
  return error;
}
