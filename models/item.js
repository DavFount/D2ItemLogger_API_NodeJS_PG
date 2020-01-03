const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('Item', {
        date: DataTypes.STRING,
        time: DataTypes.STRING,
        profile: DataTypes.STRING,
        character: DataTypes.STRING,
        difficulty: DataTypes.STRING,
        area: DataTypes.STRING,
        action: DataTypes.STRING,
        itemName: DataTypes.STRING,
        stats: Sequelize.ARRAY(DataTypes.STRING)
    }, {});

    Item.associate = (models) => {
        models.Item.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };

    Item.getUserItems = (user) => {
        return Item.findAll({
            where: {
                UserId: user.id
            }
        });
    };

    return Item;
};