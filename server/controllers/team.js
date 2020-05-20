
const teamModel = require('../modules/team');
const teamUserModel = require('../modules/team-user');
const statusCode = require('../utils/status-code');
const result = require('../utils/result');

class TeamController {
  static async addTeam(ctx, next){
    const teamQuery = ctx.request.body;
    if(teamQuery.teamName) {
      let teamData = await teamModel.findTeamByName(teamQuery.teamName);
      if (teamData) {
        ctx.body = result(null, '团队名已存在,请尝试创建新的团队', false)
      } else {
        const user = ctx.state.user;
        teamQuery.owner = user.id
        teamQuery.isDeleted = false
        const newTeam = await teamModel.createTeam(teamQuery)
        const team_user = {
          teamId: newTeam.id,
          userId: user.id,
        }
        teamUserModel.joinTeam(team_user)
        ctx.body = result({list: newTeam}, '创建成功')
      }
    }else {
      ctx.body = result(null, '缺少参数teamName字端', false)
    }

  }
  static async deleteTeam(ctx){
    const user = ctx.state.user;
    const teamList = await teamModel.findTeam(user.id);

    ctx.body = result(teamList)
  }
  static async updateTeam(ctx){
    const teamList = await teamModel.fincClasslist();

    ctx.response.status = 200;
    ctx.body = statusCode.SUCCESS_200('查询成功', {
      teamList,
    })
  }
  
  static async list(ctx){
    const user = ctx.state.user;
    const list = await teamModel.findTeam(user.id);
    // const joinList = await teamModel.
    ctx.body = result({
      list
    }, '查询成功')
  }
  
  static async myTeams(ctx){
    const user = ctx.state.user;
    const list = await teamModel.findJoinTeam(user.id);
    // console.log(list[0]);
    // for (let i = 0; i < list.length; i++) {
    //   list[i].count = await teamUserModel.count({where: {'teamId': list[i].id}})
    // }
    // const countList = await list.map(async l => {
    //   // console.log(l);
    //   l.count =
    //   // console.log(l.count);
    //   console.log(l);
    //   return l
    // })
    // console.log(65, countList);
    // const joinList = await teamModel.
    ctx.body = result({
      list
    }, '查询成功')
  }
  
  static async getTeamInfo(ctx){
    const user = ctx.state.user;
    const {id} = ctx.request.body;
    const curTeam = await teamModel.getTeamInfo(id);
    if (curTeam) {
      ctx.body = result(curTeam)
  
    } else {
      ctx.body = result(null, '团队信息不存在', false)
    }
  }
  
  static async search(ctx){
    const {teamName} = ctx.request.body;
    const list = await teamModel.searchTeamByName(teamName);
    ctx.body = result({
      list
    }, '查询成功')
  }
  
  static async joinTeam(ctx){
    const {id, password} = ctx.request.body;
    const curTeam = await teamModel.findTeamById(id);
    if (curTeam) {
      if (password === curTeam.password) {
        const user = ctx.state.user;
        const team_user = {
          teamId: id,
          userId: user.id,
        }
        const userInTeam = await teamUserModel.findUser({
          userId: user.id,
          teamId: id
        })
        if (userInTeam) {
          ctx.body = result(null, '重复加入团队', false)
        } else {
          const data = await teamUserModel.joinTeam(team_user)
          ctx.body = result(data)
        }
      } else {
        ctx.body = result(null, '密码不匹配', false)
      }
    } else {
      ctx.body = result(null, '团队不存在', false)
    }
  }
  
  static async getTeammates(ctx){
    const teamList = await teamModel.fincClasslist();
    
    ctx.response.status = 200;
    ctx.body = statusCode.SUCCESS_200('查询成功', {
      teamList,
    })
  }
  
}

module.exports = TeamController
