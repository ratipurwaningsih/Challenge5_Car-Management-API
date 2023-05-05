'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: { 
      type: DataTypes.ENUM(['superadmin', 'admin', 'user']),
      defaultValue: 'user'
    }
  }, {
    sequelize,
    modelName: 'users',
  });

  // define association/relation here
  users.associate = function (models) {
    users.hasOne(models.shops, {
      foreignKey: 'userId'
    })
  }
  return users;
};