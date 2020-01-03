const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const models = require('../database').models

exports.list = (req, res) => {
    let result = {};
    let status = 200;

    models.User.findAll({
            hierarchy: true,
            attributes: ['id', 'name']
        })
        .then((results) => {
            const payload = req.decoded;
            if (payload && payload.user == 'david') {
                result.status = status;
                result.result = results;
                res.status(status).send(result);
            } else {
                status = 401;
                result.status = status;
                result.error = 'Authentication Error';
                res.status(status).send(result);
            }
        })
        .catch(err => {
            status = 500;
            result.status = status;
            result.error = err;
            res.status(status).send(result);
        });
};

exports.new = (req, res) => {
    let result = {};
    let status = 201;

    const payload = req.decoded;
    if (payload && payload.user == 'david') {
        models.User.create(req.body)
            .then(user => {
                result.status = status;
                result.result = user;
                res.status(status).send(result);
            })
            .catch(err => {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            });
    } else {
        status = 401;
        result.status = status;
        result.error = 'Authentication Error';
        res.status(status).send(result);
    }
};

exports.show = (req, res) => {
    let result = {};
    let status = 200;

    const payload = req.decoded;
    if (payload && payload.user == 'david') {

        models.User.findOne({
                where: {
                    id: req.params.id
                },
                attributes: ['id', 'name', 'createdAt', 'updatedAt']
            })
            .then(user => {
                status = 200;
                result.status = status;
                result.result = user;
                res.status(status).send(result);
            })
            .catch(err => {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            });
    } else {
        status = 401;
        result.status = status;
        result.error = 'Authentication Error';
        res.status(status).send(result);
    }
}

exports.update = (req, res) => {
    let result = {};
    let status = 201;

    const payload = req.decoded;
    if (payload && payload.user == 'david') {

        models.User.update(req.body, {
                where: {
                    id: req.params.id
                },
                returning: true
            })
            .then(results => {
                result.status = status;
                result.numAffected = results[0];
                result.result = results[1];
                res.status(status).send(result);
            })
            .catch(err => {
                status = 500;
                result.status = status;
                result.error = 'You\'re Landing here!';
                res.status(status).send(result);
            });

    } else {
        status = 401;
        result.status = status;
        result.error = 'Authentication Error';
        res.status(status).send(result);
    }
};

exports.login = (req, res) => {
    let result = {};
    let status = 201;

    const {
        name,
        password
    } = req.body;

    models.User.findOne({
            where: {
                name: name
            }
        })
        .then(user => {
            bcrypt.compare(password, user.password)
                .then(match => {
                    if (match) {
                        status = 200;
                        const payload = {
                            user: user.name
                        };
                        const options = {
                            expiresIn: '2d',
                            issuer: 'https://savsplayground.com'
                        };
                        const secret = process.env.JWT_SECRET;
                        const token = jwt.sign(payload, secret, options);

                        result.status = status;
                        result.token = token;
                        result.result = user;
                        res.status(status).send(result);
                    } else {
                        status = 401;
                        result.status = status;
                        result.error = 'Authentication Error';
                        res.status(status).send(result);
                    };
                });
        })
        .catch(err => {
            status = 500;
            result.status = status;
            result.error = `Unable to find user ${name}`;
            res.status(status).send(result);
        });
};