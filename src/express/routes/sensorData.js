var router = require('express').Router();
var { models } = require('../../sequelize/index');
var { Op } = require('sequelize');

var SensorData = models.sensor_data;
var User = models.user;
var Token = models.token;

router.get('/sdata', async function getSensorData(req, res) {
    // if (req.query) {
    // }
    var tableAttributes = SensorData.getAttributes();
    var from = new Date(req.query.from);
    var to = new Date(req.query.to);
    var values = [];
    for (let key in req.query) {
        key = key.toLowerCase();
        if (req.query[key].toLowerCase() === 'true') {
            for (let attribute in tableAttributes) {
                if (key === attribute.toLowerCase()) {
                    values.push(key.toLowerCase());
                }
            }
        }
    }
    try {
        var data = await SensorData.findAll({
            attributes: values,
            where: {
                time: { [Op.and]: [{ [Op.gt]: from }, { [Op.lte]: to }] }
            }
        });
        // var data = await SensorData.findAll();
        console.log(data.length);
        res.send(data);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;