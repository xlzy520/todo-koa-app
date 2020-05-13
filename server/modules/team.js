const sequelize= require('../config/db');
const teamList = sequelize.import('../schema/team');
// 通过 sync 方法同步数据结构
// 即,创建表
teamList.sync({force: false})


class ClassModel{
  /**
   * 创建班级
   * @returns {Promise<boolean>}
  */
  static async create(className){
    return await teamList.create({
      className
    })
  }
  /**
   * 指定班级名查找
   */
  static async findClassByName(className){

    return await teamList.findAll({
      where:{
        className
      },
    })
  }
   /**
   * 查找班级列表
   */
  static async fincClasslist(className){
    return await teamList.findAll()
  }
}
module.exports =  ClassModel
