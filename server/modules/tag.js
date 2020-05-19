const sequelize= require('../config/db');
const Tag = sequelize.import('../schema/tag');
const User = sequelize.import('../schema/user');
// 通过 sync 方法同步数据结构
// 即,创建表
Tag.sync({force: false})
Tag.belongsTo(User, {foreignKey:'userId'});  // 班级1:n学生的关系


class TagModel{
  static async createTag(tag){
    return await Tag.create({
      tag
    })
  }
  
  static async findTagById(id){
    return await Tag.find({
      where:{
        id
      },
      raw: true
    })
  }
  
  static async findTagByNameAndUser(name, userId){
    return await Tag.find({
      where:{
        name,
        userId,
        isDeleted: null
      },
      raw: true
    })
  }
  
  static async findTag(){
    return await Tag.findAll({
      where: {
        isDeleted: null
      }
    })
  }
  
  static async updateTag(tag){
    const id = tag.id
    return await Tag.update(tag,{
      where:{
        id
      }
    })
  }
  
  static async deleteTag(tag){
    tag.isDeleted = '1'
    return await Tag.update(tag,{
      where:{
        id: task.id
      }
    })
  }
}
module.exports =  TagModel
