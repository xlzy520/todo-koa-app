const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('team', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    teamName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    desc: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    owner: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.TINYINT(0),
      allowNull: true,
      defaultValue: false
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        return moment(this.getDataValue('startTime')).format('YYYY-MM-DD hh:mm:ss');
      }
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        return moment(this.getDataValue('endTime')).format('YYYY-MM-DD hh:mm:ss');
      }
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
