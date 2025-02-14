'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, {foreignKey : 'UserId'})
    }
  };
  Task.init({
    title: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Title must be filled"
        },
        notNull : {
          msg : "Title must be filled"
        }
      },
      allowNull : false
    },
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};