const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tags', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    color: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.TINYINT(0),
      allowNull: true,
      defaultValue: false
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD hh:mm:ss');
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD hh:mm:ss');
      }
    }
  }, {
    freezeTableName: true
  })
}
