const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function tokenify(user) {

    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(user, jwtSecretKey, { expiresIn: '10000000000000000s' });
    return token;

}

function untokenify(token) {
    if(!token) {
        return null;
    }
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return user;
}

module.exports = { tokenify, untokenify }