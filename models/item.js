const environment = process.env.NODE_ENV;
const stage = require('./config')[environment];

const Sequelize = require('sequelize');
const Model = Sequelize.Model;
class Item extends Model {}
Item.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: DataTypes.STRING
}, {
    sequelize,
    modelName: 'items',
});


module.exports = Item;