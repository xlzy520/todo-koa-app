const sequelize= require('../config/db');
const ClassList = sequelize.import('../schema/class');
// 通过 sync 方法同步数据结构
// 即,创建表
ClassList.sync({force: false})


class ClassModel{
  /**
   * 创建班级
   * @returns {Promise<boolean>}
  */
  static async create(className){
    return await ClassList.create({
      className
    })
  }
  /**
   * 指定班级名查找
   */
  static async findClassByName(className){

    return await ClassList.findAll({
      where:{
        className
      },
    })
  }
   /**
   * 查找班级列表
   */
  static async fincClasslist(className){
    return await ClassList.findAll()
  }
}
module.exports =  ClassModel