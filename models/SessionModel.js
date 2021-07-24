const { prisma } = require('../db');

const findSession = (sessionId) =>
  prisma.session.findUnique({ where: { sessionId } });

module.exports = {
  findSession,
};
