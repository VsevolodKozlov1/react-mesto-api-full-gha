// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://mesto-vsevolodk.nomoredomains.rocks');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    return res.end();
  }
  next();
};
