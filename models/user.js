const bcrypt = require('bcrypt');
const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING
        }
    }, {
        indexes: [{
            unique: true,
            fields: ['name']
        }],
    });

    User.beforeCreate(user => {
        return bcrypt.hash(user.dataValues.password, stage.saltingRounds)
            .then(hash => {
                user.dataValues.password = hash;
            })
            .catch(err => {
                throw new Error(err);
            });
    });

    User.beforeBulkUpdate(user => {
        if (user.attributes.password) {
            console.log('Changing Password');
            return bcrypt.hash(user.attributes.password, stage.saltingRounds)
                .then(hash => {
                    user.attributes.password = hash;
                })
                .catch(err => {
                    throw new Error(err);
                });
        }
    });

    User.associate = (models) => {
        models.User.hasMany(models.Item);
    };

    User.find = (name) => {
        return User.findOne({
            where: {
                name: name
            }
        });
    };

    return User;
};

/**
 * David Hall: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZGF2aWRoYWxsIiwiaWF0IjoxNTc4MDI2OTM4LCJleHAiOjE1NzgxOTk3MzgsImlzcyI6Imh0dHBzOi8vc2F2c3BsYXlncm91bmQuY29tIn0.HqkPe3WnT_DRtK3CV29zkicVlz7W0n_0LTrRUpGC0JI
 * SavSin: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZGF2aWQiLCJpYXQiOjE1NzgwMDY0NDQsImV4cCI6MTU3ODE3OTI0NCwiaXNzIjoiaHR0cHM6Ly9zYXZzcGxheWdyb3VuZC5jb20ifQ.lTFNBGP_YbDz-FSK2VOxY-F9CLhEWmPp-NpOL-fWbKI
 */