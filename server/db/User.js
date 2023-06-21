const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = async (credentials) => {
  const { username, password } = credentials;
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) {
    throw new Error('Invalid username');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  return { user, token };
};

const findByToken = async (token) => {
  const decoded = jwt.verify(token, JWT_SECRET);
  const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

module.exports = {
  authenticate,
  findByToken,
};
