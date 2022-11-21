var router = require('express').Router();
var { models } = require('../../sequelize/index');
var crypto = require('node:crypto');

function excludedFields() {
    return { exclude: ['password', 'registered'] };
}


router.post('/user/create', async function create(req, res) {
    var body = req.body;
    try {
        /* sanitize body properties */
        var newUser = await models.user.create(body);
        res.status(201).send();
    } catch (e) {
        res.status(404).send('invalid request');
    }
});

router.get('/user/getall', async function getAll(req, res) {
    try {
        var users = await models.user.findAll({
            attributes: excludedFields()
        });

        res.status(200).json(users);
    } catch (e) {
        res.status(404).send('Invalid request');
    }
});

router.get('/user/:id', async function getById(req, res) {
    var id = Number.parseInt(req.params.id);
    if (Number.isNaN(id)) {
        res.status(404).send();
    } else {
        try {
            var user = await models.user.findByPk(id, {
                attributes: excludedFields()
            });
            user ? res.status(200).json(user) : res.status(404).send('404 user not found');
        } catch (e) {
            res.status(500).send();
        }
    }
});

router.post('/user/login', async function login(req, res) {

});

async function getUserAddresses(req, res) {

}


module.exports = router;