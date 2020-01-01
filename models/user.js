const bcrypt = require('bcrypt');
const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        name: DataTypes.STRING,
        password: DataTypes.STRING
    }, {});

    User.beforeCreate(user => {
        return bcrypt.hash(user.password, stage.saltingRounds)
            .then(hash => {
                user.password = hash;
            })
            .catch(err => {
                throw new Error();
            });
    });
    return User;
};