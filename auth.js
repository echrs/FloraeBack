const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }

  try {
    let decodedData = jwt.verify(token, secret);
    req.userId = decodedData?.id;
  } catch (err) {
    return res.status(401).send('Invalid token');
  }

  return next();
};

module.exports = auth;
