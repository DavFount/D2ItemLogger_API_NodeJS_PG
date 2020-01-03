const models = require('../database').models

exports.list = (req, res) => {
    let result = {};
    let status = 200;
    const payload = req.decoded;

    if (payload) {
        models.User.find(payload.user)
            .then(user => {
                models.Item.getUserItems(user)
                    .then(items => {
                        if (items.length >= 1) {
                            status = 200;
                            result.status = status;
                            res.status(status).send(items);
                        } else {
                            status = 200;
                            result.status = status;
                            result.result = 'No items found'
                            res.status(status).send(result)
                        }
                    })
                    .catch(err => {
                        status = 500;
                        result.status = status;
                        result.error = err;
                        res.status(status).send(result);
                    })
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
    };
};

exports.new = (req, res) => {
    let result = {};
    let status = 200;
    const payload = req.decoded;

    if (payload) {
        models.User.find(payload.user)
            .then(user => {
                const {
                    date,
                    time,
                    profile,
                    character,
                    difficulty,
                    area,
                    action,
                    quality,
                    itemName,
                    stats
                } = req.body;

                models.Item.create({
                        UserId: user.id,
                        date: date,
                        time: time,
                        profile: profile,
                        character: character,
                        difficulty: difficulty,
                        area: area,
                        action: action,
                        quality: quality,
                        itemName: itemName,
                        stats: stats
                    })
                    .then(item => {
                        result.status = status;
                        result.result = item;
                        res.status(status).send(result);
                    })
                    .catch(err => {
                        status = 500;
                        result.status = status;
                        result.error = err;
                        res.status(status).send(result);
                    });
            })
            .catch(err => {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(stuats).send(result);
            });
    } else {
        status = 401;
        result.status = status;
        result.error = 'Authentication Error';
        res.status(status).send(result);
    };
};

exports.show = (req, res) => {
    let result = {};
    let status = 200;
    const payload = req.decoded;

    if (payload) {
        models.User.find(payload.user)
            .then(user => {
                models.Item.getUserItem(user, req.params.id)
                    .then(item => {
                        if (item) {
                            status = 200;
                            result.status = status;
                            result.result = item;
                            res.status(status).send(result);
                        } else {
                            status = 404;
                            result.status = status;
                            result.error = 'No item found!'
                            res.status(status).send(result);
                        }
                    })
                    .catch(err => {
                        status = 404;
                        result.status = status;
                        result.error = err;
                        res.status(status).send(result);
                    })
            })
            .catch(err => {
                status = 404;
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