var crypto = require('node:crypto');

var cryptPassword = {
    numberOfIterations: 10000,
    keyLength: 50,
    algorithm: 'SHA256',
    hash(password) {
        var salt = crypto.randomBytes(16).toString('hex');
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(password, salt, this.numberOfIterations, this.keyLength, this.algorithm, (error, hash) => {
                if (error) {
                    return reject('Password hash was not been created');
                }
                var hashedPassword = `${salt}:${hash.toString('hex')}`;
                resolve(hashedPassword);
            });
        });
    },
    verify(password, hashedPassword) {
        var saltHash = hashedPassword.split(':');
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(password, saltHash[0], this.numberOfIterations, this.keyLength, this.algorithm, (error, hash) => {
                if (error) {
                    reject('Unable to check user identity. Try again!');
                }
                password = `${saltHash[0]}:${hash.toString('hex')}`;

                if (password !== hashedPassword) {
                    resolve(false);
                }
                resolve(true);
            })
        })
    }
}

module.exports = cryptPassword;