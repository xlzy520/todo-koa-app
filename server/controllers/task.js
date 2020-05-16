
const teamModel = require('../modules/team');
const taskModel = require('../modules/task');
const statusCode = require('../utils/status-code');
const result = require('../utils/result');

class TaskController {
  static async add(ctx, next){
    const task = ctx.request.body;
    if(task) {
      await taskModel.create(task)
      ctx.body = result(null, '新增待办事项成功')
      // let teamN = await teamModel.findClassByName(teamName);
      // teamN.map(x => x.get({plaint:true}))
      //
      // if(teamN && teamN.length!=0) {
      //
      //   ctx.response.status = 200;
      //   ctx.body = {msg:'班级名已存在,请尝试创建新的班级',code:405}
      //
      // }else {
      //
      //   await teamModel.create(teamName)
      //
      //   ctx.response.status = 200;
      //   ctx.body = statusCode.SUCCESS_200('创建成功', {
      //     teamName,
      //   })
      // }
    }else {
      
      ctx.body = result(null, '缺少参数', false)
    }
    
  }
  
  static async delete(ctx){
    const { id } = ctx.request.body;
    let task = await taskModel.findTaskById(id);
    // task = task[0]
    // console.log(task[0]);
    if (task) {
      task.isDeleted = '1'
      const task1 = await taskModel.updateTask(task);
      ctx.body = result({
        task,
      }, '删除成功')
    } else {
      ctx.body = result(null, '删除失败，任务不存在', false)
    }
  }
  
  static async update(ctx){
    const newTask = ctx.request.body;
  
    const task = await taskModel.updateTask(newTask);
    
    ctx.body = result({
      task,
    }, '修改成功')
  }
  
  static async list(ctx){
    const list = await taskModel.findTaskList();
    list.map(v=> {
      v.tags = v.tags.split(',')
    } )
    ctx.body = result({
      list
    }, '查询成功')
  }
  
}

module.exports = TaskController
