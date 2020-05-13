const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('task', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    desc: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    priority: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    start: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    end: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    sort: {
      type: DataTypes.INTEGER(50),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.TINYINT(0),
      allowNull: false
    },
    // teamName: {
    //   type: DataTypes.STRING(50),
    //   allowNull: false
    // },
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
