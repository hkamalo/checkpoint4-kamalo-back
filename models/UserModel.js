const { prisma } = require('../db');

const findUser = (userName) => prisma.user.findUnique({
    where: {userName},
})




module.exports = {findUser}