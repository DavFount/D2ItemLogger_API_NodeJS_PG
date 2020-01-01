const User = require('../models/users');

module.exports = {
    add: (req, res) => {
        let result = {};
        let status = 201;

        const { name, password } = req.body

        User.build({ 
            name: name,
            password: password
        })
        .save()
        .then( user => {
            result.status = status;
            result.result = user;
        })
        .catch(error => {
            status = 500;
            result.status = status;
            result.error = err;
        });
        res.status(status).send(result);
    }
};