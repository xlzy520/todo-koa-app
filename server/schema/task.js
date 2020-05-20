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
      allowNull: true,
      defaultValue: ''
    },
    priority: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    priorityColor: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: ''
    },
    // 类型，标签
    tags: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    start: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: ''
    },
    end: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: ''
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    sortIndex: {
      type: DataTypes.INTEGER(50),
      allowNull: false
    },
    status: {
      type: DataTypes.TINYINT(0),
      allowNull: false,
      defaultValue: false
    },
    isDeleted: {
      type: DataTypes.TINYINT(0),
      allowNull: true,
      defaultValue: false
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
