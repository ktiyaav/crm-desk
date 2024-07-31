const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const generateToken = (user) => {
  return jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET ?? 'secretkey', {
    expiresIn: "1h",
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET?? 'secretkey');
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

const comparePasswords = async (plainPassword, storedHash) => {
  const match = await bcrypt.compare(plainPassword, storedHash);
  return match;
};

module.exports = { generateToken, verifyToken, hashPassword, comparePasswords };
