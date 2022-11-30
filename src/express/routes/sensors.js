var router = require('express').Router();
var { models } = require('../../sequelize/index');
var generateAuthToken = require('../../utils/generateAuthToken');
var cryptPassword = require('../../utils/cryptPassword');
var auth = require('../../utils/auth');

var User = models.user;
var Sensor = models.sensor;
var Sensor_data = models.sensor_data;
var Token = models.token;


router.post('/sensor/register', async function registerSendsor(req, res) {
    try {
        var body = req.body;
        var user = await User.findOne({ where: { email: body.email } });
        var addresses = await user.getAddresses();
        var isVerified = await cryptPassword.verify(body.password, user.password);

        if (!isVerified) {
            return res.status(400).send('Authentification failed!');
        }

        var sensor = await Sensor.findOne({
            where: {
                user_id: user.id,
                mac: body.mac,
            }
        });
        if (!sensor) {
            sensor = await Sensor.create({
                user_id: user.dataValues.id,
                mac: body.mac,
                room: body.room,
                address_id: addresses[0].id
            });
        }
        var token = await generateAuthToken({ id: sensor.id });
        await Token.destroy({
            where: {
                sensor_id: sensor.id
            }
        })
        await sensor.createToken({ token });
        res.status(200).send({ token });

    } catch (e) {
        res.sendStatus(400);
    }
});

router.post('/sensor/data', auth, async (req, res) => {
    try {
        var sensor = req.sensor;
        var address = await sensor.getAddress();

        await Sensor_data.create({
            temperature: req.body?.temperature || 0,
            humidity: req.body?.humidity || 0,
            pressure: req.body?.pressure || 0,
            place: req.body?.room || '',
            address_id: address.id
        });
        res.status(200).send({ token: req.token });

    } catch (e) {
        res.sendStatus(500);
    }

});


//temp for testing old sensor posts path
// router.post('/post-sensor-data', (req, res) => {
//     // console.log(req.headers);
//     // if (typeof req.body === 'object') {
//     //     console.log(req.body);
//     //     res.sendStatus(200);
//     // } else {
//     //     try {
//     //         body = JSON.parse(req.body);
//     //         console.log(body);
//     //         res.sendStatus(200);
//     //     } catch {
//     //         res.send('JSON only accepted').status(406);
//     //     }
//     // }

//     console.log(res.body);
//     res.sendStatus(200);
// })

module.exports = router;