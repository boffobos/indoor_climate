var jwt = require('jsonwebtoken');

function generateAuthToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN },
            (error, token) => {
                if (error) {
                    reject(error);
                }
                resolve(token);
            }
        );
    });
}

module.exports = generateAuthToken;