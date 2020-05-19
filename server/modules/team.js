const sequelize= require('../config/db');
const Team = sequelize.import('../schema/team');
const TeamUser = sequelize.import('../schema/team-user');
const Op = sequelize.Op;
// 通过 sync 方法同步数据结构
// 即,创建表
Team.sync({force: false})

Team.belongsTo(TeamUser, { foreignKey: 'id', targetKey: 'teamId' });


class TeamModel{
  static async createTeam(team){
    return await Team.create(team)
  }
  
  static async findTeamById(id){
    return await Team.find({
      where:{
        id,
        isDeleted: false
      },
      raw: true
    })
  }
  
  static async findJoinTeam(userId){
    return await Team.findAll({
      attributes: {
        exclude: ['password'],
        include: [[sequelize.fn('COUNT', 'team-user.teamId'), 'count']]
      },
      where:{
        // teamId,
        isDeleted: false
      },
      include:[{
        model: TeamUser,
        where:{
          userId,
          isDeleted: false
        },
        // through: {
        //   // attributes: ['createdAt', 'startedAt', 'finishedAt'], //过滤属性
        //   where: {userId}
        // }
      }],
      raw: true
    })
  }
  
  
  static async findTeamByName(teamName){
    return await Team.find({
      where:{
        teamName,
        isDeleted: false
      },
      raw: true
    })
  }
  
  static async searchTeamByName(teamName){
    return await Team.findAll({
      attributes: ['teamName', 'id', 'desc'],
      where:{
        teamName: {
          [Op.like]:'%' +teamName + '%'
        },
        isDeleted: false
      },
      raw: true
    })
  }
  
  static async findTeamByNameAndUser(name, userId){
    return await Team.find({
      where:{
        name,
        userId,
        isDeleted: false
      },
      raw: true
    })
  }
  
  static async findTeam(userId){
    return await Team.findAll({
      where: {
        isDeleted: false,
        owner: userId
      }
    })
  }
  
  static async updateTeam(tag){
    const id = tag.id
    return await Team.update(tag,{
      where:{
        id
      }
    })
  }
  
  static async deleteTeam(tag){
    tag.isDeleted = '1'
    return await Team.update(tag,{
      where:{
        id: task.id
      }
    })
  }
}
module.exports =  TeamModel

