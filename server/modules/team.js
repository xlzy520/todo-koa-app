const sequelize= require('../config/db');
const Team = sequelize.import('../schema/team');
const TeamUser = sequelize.import('../schema/team-user');
const User = sequelize.import('../schema/user');
const teamUserModel = require('../modules/team-user');
const Op = sequelize.Op;
// 通过 sync 方法同步数据结构
// 即,创建表
Team.sync({force: false})

Team.belongsToMany(User, {  through: {
    model: TeamUser,
    unique: false,
  },  foreignKey: 'teamId', //通过外键postId
  constraints: false });


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
        // include: [[sequelize.fn('COUNT', sequelize.col('teamId')), 'count']],
        exclude: ['password'],
      },
      where:{
        // teamId,
        isDeleted: false
      },
      include:[{
        model: User,
        attributes: ['id', 'name'],
        where:{
          // userId,
          isDeleted: false,
          // exclude: ['users'],
        },
        through: { //除去中间表
          attributes: []
        },
        // through: {
        //   // attributes: ['createdAt', 'startedAt', 'finishedAt'], //过滤属性
        //   where: {userId}
        // }
      }],
      // raw: true
    })
  }
  
  static async getTeamInfo(id){
    return await Team.find({
      attributes: {
        exclude: ['password'],
      },
      where:{
        id,
        isDeleted: false
      },
      include:[{
        model: User,
        attributes: { exclude: ['password', 'question', 'answer'] },
        where:{
          isDeleted: false,
        },
        through: { //除去中间表
          attributes: []
        },
      }],
      // raw: true
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
      attributes: ['teamName', 'id', 'desc', 'startTime', 'endTime'],
      where:{
        teamName: {
          [Op.like]:'%' +teamName + '%'
        },
        isDeleted: false
      },
      include:[{
        model: User,
        attributes: { exclude: ['password', 'question', 'answer'] },
        where:{
          isDeleted: false,
        },
        through: { //除去中间表
          attributes: []
        },
      }],
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

