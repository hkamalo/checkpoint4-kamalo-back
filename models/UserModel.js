const argon2 = require('argon2');
const { prisma } = require('../db');

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (plainPassword) =>
  argon2.hash(plainPassword, hashingOptions);

const verifyPassword = (plainPassword, hashedPassword) =>
  argon2.verify(hashedPassword, plainPassword, hashingOptions);

const createNewUser = (username, hashedPassword) =>
  prisma.user.create({
    data: { username, hashedPassword },
  });

const findUsernameInDB = (username) =>
  prisma.user.findUnique({
    where: { username },
    
  });

  const usernameAlreadyInDB = async (newUsername) => {
      const usernameInDb = await findUser(newUsername);

      if(!usernameInDb) return false;
      return true 
  };

module.exports = { findUsernameInDB, hashPassword, verifyPassword, createNewUser, usernameAlreadyInDB };
