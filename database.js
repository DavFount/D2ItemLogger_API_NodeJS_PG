const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const environment = process.env.NODE_ENV;
const stage = require('./config')[environment];
const basename = path.basename(__filename);

const sequelize = new Sequelize(stage.db_name, stage.db_user, stage.db_password, {
    dialect: 'postgres',
    host: stage.db_host,
    port: stage.db_port,
    logging: false,
});

let models = {};
fs
    .readdirSync(__dirname + '/models')
    .filter(file => (
        (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
    ))
    .forEach(file => {
        let model = sequelize['import'](path.join(__dirname, '/models', file));
        models[model.name] = model;
    });

Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

sequelize.sync({
        force: false
    })
    .then(() => {
        console.log('Successfully connected to Datbase!');
    });

module.exports = {
    models
}