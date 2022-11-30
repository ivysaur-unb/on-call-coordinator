const prisma = require('../prismaClient');

async function getUserByEmail(email, password) {

    let result = await prisma.user.findFirst({
        where: {
            email: email,
            password: password
        },
        include: {
            teacher: true
        }

    })
    return result;
}

module.exports = { getUserByEmail };