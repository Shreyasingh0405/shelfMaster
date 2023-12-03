const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET || 'default_secret_key';

const getJwtToken = (userId) => {
  return jwt.sign({ userId: userId }, secretKey, { expiresIn: '1 day' });
};

module.exports = getJwtToken;