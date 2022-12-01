const argon2 = require('argon2');
const prisma = require('../prismaClient');

async function getUserByEmail(email) {
    let result = await prisma.user.findUnique({
        where: {
            email: email,
        },
        include: {
            teacher: true
        }

    });
    return result;
}

async function createUser(name, email, password, role) {
    const passwordHash = await argon2.hash(password);
    const errors = [];
    let user;
    try {
        user = await prisma.user.create({
            data: {
                email,
                name,
                passwordHash,
                role,
            },
        });
    } catch (e) {
        console.log(e);
        errors.push(e);
    }

    return { ...user, errors };
}

module.exports = { getUserByEmail, createUser };
