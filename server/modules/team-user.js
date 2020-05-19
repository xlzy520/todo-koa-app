const sequelize= require('../config/db');
const TeamUser = sequelize.import('../schema/team-user');
const Op = sequelize.Op;
// 通过 sync 方法同步数据结构
// 即,创建表
TeamUser.sync({force: false})

class TeamUserModel {
  
  static async joinTeam(user){
    return await TeamUser.create(user)
  }
  
  static async count(condition){
    return await TeamUser.count(condition)
  }
  
  static async findTeamById(id){
  
  }
  
  static async findUser(data){
    return await TeamUser.find({
      where:{
        ...data,
        isDeleted: false
      },
      raw: true
    })
  }
  
  
}
module.exports =  TeamUserModel

