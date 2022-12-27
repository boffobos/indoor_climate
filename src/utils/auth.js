var jwt = require('jsonwebtoken');
var generateAuthToken = require('../utils/generateAuthToken');
var sequelize = require('../sequelize/index');
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
                    if (user) {
                        console.log('genetaing new token for user');
                        const newToken = await generateAuthToken({ id: user.id });
                        let newTokenObj = await user.createToken({ token: newToken });
                        await token.destroy();
                        token = newTokenObj;
                    } else if (sensor) {
                        console.log('genetaing new token for sensor');
                        const newToken = await generateAuthToken({ id: sensor.id });
                        let newTokenObj = await sensor.createToken({ token: newToken });
                        await token.destroy();
                        token = newTokenObj;
                    }
                } else {
                    //When token exeeds limit of days from issue time it should be deleted from db
                    await token.destroy();
                    throw new Error({ error: 'Token expired. Please authenticate!' });
                }

            } else if (error) {
                // When token failure it should be deleted from db
                if (token) {
                    await token.destroy();
                }
                throw new Error({ error: 'Token failure. Please authenticate!' });
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