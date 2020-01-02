const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../database').User;

exports.list = (req, res) => {
    let result = {};
    let status = 200;

    User.findAll({
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
        User.create(req.body)
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

exports.login = (req, res) => {
    let result = {};
    let status = 201;

    const {
        name,
        password
    } = req.body;

    User.findOne({
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