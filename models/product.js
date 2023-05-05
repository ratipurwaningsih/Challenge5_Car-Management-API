'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
    imageUrl: DataTypes.TEXT,
    shopId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });

  // define association here
  product.associate = function (models) {
    // relation/associate shops -> products
    product.belongsTo(models.shops, {
      foreignKey: 'shopId'
    })
  }

  return product;
};