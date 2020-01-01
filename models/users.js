const bcrypt = require('bcrypt');
const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];

const Sequelize = require('sequelize');
const sequelize = require('../database');

const Model = Sequelize.Model;
class User extends Model {}
User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: Sequelize.STRING
}, {
    sequelize,
    modelName: 'users',
    hooks: {
        beforeCreate: (user, options) => {
            return bcrypt.hash(user.password, stage.saltingRounds)
                .then(hash => {
                    user.password = hash;
                })
                .catch(err => {
                    throw new Error();
                });
        }
    }
});


module.exports = User;