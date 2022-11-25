var jwt = require('jsonwebtoken');
var generateAuthToken = require('../utils/generateAuthToken');
var sequelize = require('../sequelize/index');
var Token = sequelize.models.token;


async function auth(req, res, next) {
    try {
        var bearerToken = req.header('Authorization').replace('Bearer ', '');
        var token = await Token.findByPk(bearerToken);
        var user = await token.getUser();

        jwt.verify(bearerToken, process.env.JWT_SECRET, async (error, decoded) => {
            if (error && error.expiredAt) {
                var periodOfTokenInactivityDays = new Date(Date.now() - error.expiredAt).valueOf() / (1000 * 60 * 60 * 24);
                if (periodOfTokenInactivityDays <= process.env.JWT_INACTIVITY_ALLOWED_DAYS) {
                    var newToken = await generateAuthToken({ id: user.id });
                    await user.createToken({ token: newToken });
                    await token.destroy();
                    req.token = newToken;
                    req.user = user;
                    next();
                } else {
                    //When token exeeds limit of days from issue time it should be deleted from db
                    await token.destroy();
                    res.status(401).send({ error: 'Token expired. Please authenticate!' });
                    return;
                }

            } else if (error) {
                // When token failure it should be deleted from db
                await token.destroy();
                res.status(401).send({ error: 'Token failure. Please authenticate!' });
                return;
            }
            req.token = token.token;
            req.user = user;
            next();
        });

    } catch (e) {
        res.status(401).send({ error: 'Please authenticate!' });
    }
}

module.exports = auth;