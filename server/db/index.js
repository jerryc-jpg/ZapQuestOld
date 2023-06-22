const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const password = '123';
const hashedPassword = bcrypt.hashSync(password, 10);

const syncAndSeed = async()=> {
  await prisma.user.deleteMany();
  await prisma.user.create({
    data: {
      username: 'moe',
      password: hashedPassword,
    },
  })
  await prisma.user.create({
    data: {
      username: 'larry',
      password: hashedPassword,
      },
      });
}


module.exports = {
  syncAndSeed,
  prisma,
};
