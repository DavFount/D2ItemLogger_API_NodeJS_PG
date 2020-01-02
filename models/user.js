const bcrypt = require('bcrypt');
const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];

// const Item = require('./item');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: DataTypes.STRING
    }, {
        indexes: [
            {
                unique: true,
                fields: ['name']
            }
        ],
    });

    User.beforeCreate(user => {
        return bcrypt.hash(user.password, stage.saltingRounds)
            .then(hash => {
                user.password = hash;
            })
            .catch(err => {
                throw new Error();
            });
    });

    User.associate = (models) => {
        models.User.hasMany(models.Item);
    };

    User.find = (name) => {
        return User.findOne({
            where: {name: name}
        });
    }

    return User;
};