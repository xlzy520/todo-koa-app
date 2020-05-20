const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    question: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    answer: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    skill: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.TINYINT(0),
      allowNull: true,
      defaultValue: false
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    // sex: {
    //   type: DataTypes.STRING(20),
    //   allowNull: true,
    // },
    // telephone: {
    //   type: DataTypes.INTEGER(20),
    //   allowNull: true,
    // },
    role: {
      type: DataTypes.STRING(20),
      allowNull: true,
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
