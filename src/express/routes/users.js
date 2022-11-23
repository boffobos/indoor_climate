var router = require('express').Router();
var { models } = require('../../sequelize/index');
var cryptPassword = require('../../utils/cryptPassword');
var generateAuthToken = require('../../utils/generateAuthToken');

var User = models.user;

function excludeFieldsFromUsers(users) {
    var exclude = ['password', 'registered'];
    if (!Array.isArray(users)) {
        users = [users];
    }
    var usr = users.map(user => {
        user = user.toJSON();
        exclude.forEach(prop => {
            delete user[prop];
        });
        return user;
    })
    return usr;
}


router.post('/user/create', async function create(req, res) {
    var body = req.body;
    try {
        /* sanitize body properties */
        await User.create(body);
        res.status(201).send();
    } catch (e) {
        res.status(400).send('invalid request');
    }
});

router.get('/user/getall', async function getAll(req, res) {
    try {
        var users = await User.findAll();
        res.status(200).json(excludeFieldsFromUsers(users));
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
            var user = await User.findByPk(id);
            user ? res.status(200).json(excludeFieldsFromUsers(user)[0]) : res.status(404).send('404 user not found');
        } catch (e) {
            res.status(500).send();
        }
    }
});

router.post('/user/login', async function login(req, res) {
    try {
        var user = await User.findOne({ where: { email: req.body.email } });
        var isVerified = await cryptPassword.verify(req.body.password, user.password);

        if (!isVerified) {
            return res.status(400).send('authentification failed');
        }
        var token = await generateAuthToken({ id: user.toJSON().id });
        await user.createToken({ token });
        user = excludeFieldsFromUsers(user)[0];
        res.send({ user, token });
    } catch (e) {
        res.status(400).send()
    }
});

async function getUserAddresses(req, res) {

}


module.exports = router;