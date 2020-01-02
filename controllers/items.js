const models = require('../database').models

exports.list = (req, res) => {
    let result = {};
    let status = 200;
    const payload = req.decoded;

    if (payload) {
        const loggedInUser = User.findAll({
            where: {
                name: payload.user
            },
            attributes: ['id']
        });

        models.Item.findAll({
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

    if(payload) {
        const userPromise = models.User.find(payload.user)
                .then()
                .catch();

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

        console.log(`Attempting to create new item: \n
                    User: ${loggedInUser} UserId: ${loggedInUser} \n
                    Date: ${date} Time: ${time} \n
                    Profile: ${profile} Character: ${character} \n
                    Difficulty: ${difficulty} Area: ${area} \n
                    Action: ${action} Quality: ${quality} \n
                    Item Name: ${itemName} Stats: \n
                    ${stats.join('\n')}`);

        // models.Item.create({
        //     // Placeholder
        // });
        res.status(status).send('Check the logs');
    } else {
        status = 401;
        result.status = status;
        result.error = 'Authentication Error';
        res.status(status).send(result);
    };
};