// const allowedCors = [
//   'https://mesto-vsevolodk.nomoredomains.rocks',
// ];
// const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
// const DEFAULT_ALLOWED_HEADERS = 'Origin, X-Requested-With, Content-Type, Accept';

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  // const { origin } = req.headers;
  // const requestHeaders = req.headers['access-control-request-headers'];
  // if (allowedCors.includes(origin)) {
  //   res.header('Access-Control-Allow-Origin', origin);
  //   if (req.method === 'OPTIONS') {
  //     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  //     res.header('Access-Control-Allow-Headers', requestHeaders);
  //   }
  // }
  res.header('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    return res.end();
  }
  next();
};
