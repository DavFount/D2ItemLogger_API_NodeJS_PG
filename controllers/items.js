const {
    User,
    Item
} = require('../database');

exports.list = (req, res) => {
    let result = {};
    let status = 200;
    const payload = req.decoded;

    const loggedInUser = User.findAll({
        where: {
            name: payload.user
        },
        attributes: ['id']
    });

    Item.findAll({
            where: {
                userId: loggedInUser.id
            },
            hierarchy: true
        })
        .then((results) => {
            result.status = status;
            result.result = results;
            res.status(status).send(result);
        })
        .catch(err => {
            status = 500;
            result.status = status;
            result.error = err;
            res.status(status).send(result);
        });
};