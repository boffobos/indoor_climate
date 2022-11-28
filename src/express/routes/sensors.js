var router = require('express').Router();
var { models } = require('../../sequelize/index');
var generateAuthToken = require('../../utils/generateAuthToken');

var User = models.user;
var Sensor = models.sensor;
var Sensor_data = models.sensor_data;


router.post('/sensor/register', async function registerSendsor(req, res) {
    try {
        var body = req.body;
        var user = await User.findOne({ where: { email: body.email } });
        var sensor = await Sensor.find({
            where: {
                user_id: user.dataValues.id,
                mac: body.mac,
            }
        });
        console.log(user);
        if (!sensor) {
            sensor = await Sensor.create({
                user_id: user.dataValues.id,
                mac: body.mac,
                room: body.room
            });
        }
        console.log(sensor);
        var token = await generateAuthToken({ id: sensor.dataValues.id });
        await sensor.createToken({ token });
        res.status(200).send({ token });

    } catch (e) {
        res.sendStatus(400);
    }
});

router.post('/sensor/data', async (req, res) => {
    var body = req.body;
    var user = await User.findOne({ where: { email: body.email } });
    var sensor = await Sensor.findOne({ where: {} });
    var senor_data = await Sensor_data.create({
        temperature: body?.temperature || 0,
        humidity: body?.humidity || 0,
        pressure: body?.pressure || 0,
        address_id: 10,
        place: body?.room || '',
    });
    console.log(senor_data.dataValues);
    res.sendStatus(200);
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