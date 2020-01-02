const Sequelize = require('sequelize');

const User = require('../database').User;

module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('items', {
        date: DataTypes.STRING,
        time: DataTypes.STRING,
        profile: DataTypes.STRING,
        character: DataTypes.STRING,
        difficulty: DataTypes.STRING,
        area: DataTypes.STRING,
        action: DataTypes.STRING,
        itemName: DataTypes.STRING,
        stats: Sequelize.ARRAY(DataTypes.STRING)
    });

    // Item.belongsTo(User);
    return Item;
};