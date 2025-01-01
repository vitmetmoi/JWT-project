'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Group extends Model {

        static associate(models) {
            Group.hasMany(models.User, { foreignKey: 'groupId' });
            Group.belongsToMany(models.Role, { through: "Group_Role" }, { foreignKey: "groupId" })
        }
    }
    Group.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Group',
    });
    return Group;
};