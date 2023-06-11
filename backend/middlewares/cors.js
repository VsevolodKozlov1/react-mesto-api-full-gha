const allowedCors = [
  'http://mesto-vsevolodk.nomoredomains.rocks/signin',
  'https://mesto-vsevolodk.nomoredomains.rocks',
  'localhost:3000',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  }
  // res.header('Access-Control-Allow-Origin', '*');
  next();
};
