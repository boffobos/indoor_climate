var router = require('express').Router();
var { models } = require('../../sequelize/index');
var crypto = require('node:crypto');
var generateAuthToken = require('../../utils/generateAuthToken');

var User = models.user;

function excludedFields() {
    return { exclude: ['password', 'registered'] };
}


router.post('/user/create', async function create(req, res) {
    var body = req.body;
    try {
        /* sanitize body properties */
        var newUser = await User.create(body);
        res.status(201).send();
    } catch (e) {
        res.status(404).send('invalid request');
    }
});

router.get('/user/getall', async function getAll(req, res) {
    try {
        var users = await User.findAll({
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
            var user = await User.findByPk(id, {
                attributes: excludedFields()
            });
            user ? res.status(200).json(user) : res.status(404).send('404 user not found');
        } catch (e) {
            res.status(500).send();
        }
    }
});

router.post('/user/login', async function login(req, res) {
    try {
        var user = await User.findOne({ where: { email: req.body.email } });
        var saltHash = user.password.split(':');
        //refactor thit to separate funtion?
        crypto.pbkdf2(req.body.password, saltHash[0], 513, 59, 'SHA256', async (error, hash) => {
            if (error) {
                return res.status(500).send('Unable to check user identity. Try again!');
            }
            receivedPassword = `${saltHash[0]}:${hash.toString('hex')}`;

            if (receivedPassword !== user.password) {
                return res.status(400).send('Authentification failed! Try again!');
            }
            var token = await generateAuthToken(user.toJSON());
            await user.createToken({ token });
            res.send({ user, token });

        });

    } catch (e) {
        res.status(400).send()
    }

});

async function getUserAddresses(req, res) {

}


module.exports = router;