
const teamModel = require('../modules/team');
const taskModel = require('../modules/task');
const statusCode = require('../utils/status-code');
const result = require('../utils/result');
const moment = require('moment');

function getList(dayIndex){
  return taskModel.findTaskList({
    start: moment().add(dayIndex, 'day').format('YYYY-MM-DD'),
  })
}

class TaskController {
  static async add(ctx, next){
    const task = ctx.request.body;
    const user = ctx.state.user;
    if(task) {
      task.userId = user.id
      const list = await taskModel.findTaskList({
        userId: user.id
      })
      task.sortIndex = list.length
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
    ctx.body = result({
      list
    }, '查询成功')
  }
  

  
  static async getFourDay(ctx){
    const today = await getList(0)
    const tomorrow = await getList(1)
    ctx.body = result({
      list: {today, tomorrow}
    }, '查询成功')
  }
  
  static async get7Day(ctx){
    const list = await taskModel.findTaskList({
    
    })
    ctx.body = result({
      list
    }, '查询成功')
  }
  
}

module.exports = TaskController
