const sequelize= require('../config/db');
const User = sequelize.import('../schema/user');
const TeamModule = sequelize.import('../schema/team');
const _ =  require('lodash')

User.belongsTo(TeamModule, {foreignKey:'class_id'});  // 班级1:n学生的关系

// 通过 sync 方法同步数据结构
// 即,创建表
User.sync({force: false})


class UserModel{

  static async findUserByName(username){
    return await User.find({
      where:{
        username
      },
      raw: true  // 直接返回js object对象
    })
  }

  /**
   * 创建用户
   * @returns {Promise<boolean>}
   * @param userInfo
   */
  static async create(userInfo){
    // console.log(userInfo);
    const newInfo = _.omit(userInfo, 'createdAt', 'updatedAt')
    newInfo.isDeleted = false
    newInfo.skill = userInfo.skill.join(',')
    newInfo.role = 'user'
    // let {zhName, enName, password, pwd, class_id, sex, telephone} = userInfo;
    return await User.create(newInfo)
  }
  
  static async findAllUserList(){
    return  await User.findAll({
      attributes: ['id', 'username'],
      include: [{
        model:TeamModule,
      }],
    })
  }
}
module.exports =  UserModel
