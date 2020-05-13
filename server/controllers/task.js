
const teamModel = require('../modules/team');
const statusCode = require('../utils/status-code');

class TeamController {
  static async add(ctx, next){
    const { teamName } = ctx.request.body;
    if(teamName) {
      
      let teamN = await teamModel.findClassByName(teamName);
      teamN.map(x => x.get({plaint:true}))
      
      if(teamN && teamN.length!=0) {
        
        ctx.response.status = 200;
        ctx.body = {msg:'班级名已存在,请尝试创建新的班级',code:405}
        
      }else {
        
        await teamModel.create(teamName)
        
        ctx.response.status = 200;
        ctx.body = statusCode.SUCCESS_200('创建成功', {
          teamName,
        })
      }
    }else {
      
      ctx.body = statusCode.ERROR_400('缺少参数teamName字端')
    }
    
  }
  static async delete(ctx){
    const teamList = await teamModel.fincClasslist();
    
    ctx.response.status = 200;
    ctx.body = statusCode.SUCCESS_200('查询成功', {
      teamList,
    })
  }
  static async update(ctx){
    const teamList = await teamModel.fincClasslist();
    
    ctx.response.status = 200;
    ctx.body = statusCode.SUCCESS_200('查询成功', {
      teamList,
    })
  }
  static async list(ctx){
    const teamList = await teamModel.fincClasslist();
    
    ctx.response.status = 200;
    ctx.body = statusCode.SUCCESS_200('查询成功', {
      teamList,
    })
  }
  
}

module.exports = TeamController
