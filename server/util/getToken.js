import passport from 'passport';
require('./passport')(passport);

// get token
export function getToken(headers) {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    }
  }
  return null;
}
