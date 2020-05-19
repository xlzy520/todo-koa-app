const sequelize= require('../config/db');
const TaskList = sequelize.import('../schema/task');
const Tag = sequelize.import('../schema/tag');
// 通过 sync 方法同步数据结构
// 即,创建表
TaskList.sync({force: false})


class TaskModel{
  static async create(task){
    return await TaskList.create(task)
  }
  
  static async findTaskById(id){
    return await TaskList.find({
      where:{
        id
      },
      raw: true
    })
  }

  static async findTaskByName(className){
    return await TaskList.findAll({
      where:{
        className
      },
    })
  }
  
  static async findTaskList(){
    return await TaskList.findAll({
      where: {
        isDeleted: null
      }
    })
  }
  
  static async updateTask(task){
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
  
  static async deleteTask(task){
    task.isDeleted = '1'
    return await TaskList.update(task,{
      where:{
        id: task.id
      }
    })
  }
  
}
module.exports =  TaskModel
