const sequelize= require('../config/db');
const User = sequelize.import('../schema/user');
const TeamModule = sequelize.import('../schema/team');
const _ =  require('lodash')

User.belongsTo(TeamModule, {foreignKey:'team_id'});  // 班级1:n学生的关系

// 通过 sync 方法同步数据结构
// 即,创建表
User.sync({force: false})


class UserModel{

  static async findUserByPhone(phone){
    return await User.find({
      where:{
        phone
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
    const newInfo = _.omit(userInfo, 'createdAt', 'updatedAt')
    newInfo.isDeleted = false
    newInfo.skill = userInfo.skill.join(',')
    newInfo.role = 'user'
    // let {zhName, enName, password, pwd, class_id, sex, telephone} = userInfo;
    return await User.create(newInfo)
  }
  
  static async resetPassword(userInfo, newPassword){
    const { id } = userInfo
    return await User.update({
      password: newPassword
    }, {
      where: {
        id
      }
    })
  }
  
  static async update(task){
    const id = task.id
    task.userId = '1'
    task.sortIndex = 1
    task.tags = (task.tags?task.tags : []).join(',')
    return await TaskList.update(task,{
      where:{
        id
      }
    })
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
