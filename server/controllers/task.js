
const teamModel = require('../modules/team');
const taskModel = require('../modules/task');
const statusCode = require('../utils/status-code');
const result = require('../utils/result');

class TaskController {
  static async add(ctx, next){
    const task = ctx.request.body;
    const user = ctx.state.user;
    if(task) {
      task.status = 0
      task.userId = user.id
      task.sortIndex = 1
      task.tags = task.tags.join(',')
      await taskModel.create(task)
      ctx.body = result(null, '新增待办事项成功')
    }else {
      ctx.body = result(null, '缺少参数', false)
    }
    
  }
  
  static async delete(ctx){
    const { id } = ctx.request.body;
    let task = await taskModel.findTaskById(id);
    if (task) {
      task.isDeleted = '1'
      const newTask = await taskModel.updateTask(task);
      ctx.body = result({
        task: newTask,
      }, '删除成功')
    } else {
      ctx.body = result(null, '删除失败，任务不存在', false)
    }
  }
  
  static async update(ctx){
    const newTask = ctx.request.body;
    await taskModel.updateTask(newTask);
    ctx.body = result({
      task: newTask,
    }, '更新成功')
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
