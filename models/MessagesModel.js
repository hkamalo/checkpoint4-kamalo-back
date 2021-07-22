const { prisma } = require('../db');

const storeMessage = async (message) =>
  prisma.messages.create({
    data: message,
  });

const getExhangedMessage = async (senderId, receiverId) =>
  prisma.messages.findMany({
    where: { senderId, receiverId },
    orderBy: {
      sendingDate: 'desc',
    },
  });

module.exports = { storeMessage, getExhangedMessage };
