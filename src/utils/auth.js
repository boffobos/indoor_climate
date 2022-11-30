var jwt = require('jsonwebtoken');
var generateAuthToken = require('../utils/generateAuthToken');
var sequelize = require('../sequelize/index');
const { sensor } = require('../sequelize/models');
var Token = sequelize.models.token;


async function auth(req, res, next) {
    try {
        var bearerToken = req.header('Authorization').replace('Bearer ', '');
        var token = await Token.findByPk(bearerToken);
        if (!token) {
            throw new Error('Please authenticate!');
        }
        if (token?.user_id) {
            var user = await token.getUser();
        } else if (token?.sensor_id) {
            var sensor = await token.getSensor();
        }

        jwt.verify(bearerToken, process.env.JWT_SECRET, async (error) => {
            if (error && error.expiredAt) {
                var periodOfTokenInactivityDays = new Date(Date.now() - error.expiredAt).valueOf() / (1000 * 60 * 60 * 24);
                if (periodOfTokenInactivityDays <= process.env.JWT_INACTIVITY_ALLOWED_DAYS) {
                    var newToken = await generateAuthToken({ id: user.id || sensor.id });
                    await user.createToken({ token: newToken });
                    await token.destroy();
                    req.token = newToken;
                    user ? req.user = user : req.sensor = sensor;
                    next();
                } else {
                    //When token exeeds limit of days from issue time it should be deleted from db
                    await token.destroy();
                    res.status(401).send({ error: 'Token expired. Please authenticate!' });
                    return;
                }

            } else if (error) {
                // When token failure it should be deleted from db
                if (token) {
                    await token.destroy();
                }
                res.status(401).send({ error: 'Token failure. Please authenticate!' });
                return;
            }
            req.token = token.token;
            user ? req.user = user : req.sensor = sensor;
            next();
        });

    } catch (e) {
        console.log(e);
        res.status(401).send({ error: 'Please authenticate!' });
    }
}

module.exports = auth;