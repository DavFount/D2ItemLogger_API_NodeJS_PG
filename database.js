const Sequelize = require('sequelize');
const environment = process.env.NODE_ENV;
const stage = require('./config')[environment];

const sequelize = new Sequelize(stage.db_name, stage.db_user, stage.db_password, {
    dialect: 'postgres',
    host: stage.db_host,
    port: stage.db_port,
    logging: false,
});

const UserModel = require('./models/user');
const User = UserModel(sequelize, Sequelize);

const ItemModel = require('./models/item');
const Item = ItemModel(sequelize, Sequelize);

sequelize.sync({
        force: false
    })
    .then(() => {
        console.log('Successfully connected to Datbase!');
    });

module.exports = {
    User,
    Item
}