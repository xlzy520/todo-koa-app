
const tagModel = require('../modules/tag');
const result = require('../utils/result');

class TagController {
  static async createTag(ctx, next){
    const tag = ctx.request.body;
    const { name } = tag;
    const userInfo = ctx.state.userInfo
    const userId = userInfo.id
    console.log(userInfo);
    if(name) {
      const tag = await tagModel.findTagByNameAndUser(name, userId)
      if (tag) {
        result(null, '标签已存在', false)
      } else {
        tag.userId = userId
        await tagModel.createTag(tag)
        result()
      }
    }else {
      result(null, '缺少参数标签name', false)
    }

  }
  static async deleteTag(ctx){
    const { id } = ctx.request.body;
    let tag = await tagModel.findTagById(id);
    if (tag) {
      const tag = await tagModel.deleteTag(tag);
      ctx.body = result({
        tag,
      }, '删除成功')
    } else {
      ctx.body = result(null, '删除失败，标签不存在', false)
    }
  }
  static async updateTag(ctx){
    const { tag } = ctx.request.body;
    let curTag = await tagModel.findTagById(tag.id);
    if (curTag) {
      const tag = await tagModel.updateTag(tag);
      ctx.body = result({
        tag,
      }, '删除成功')
    } else {
      ctx.body = result(null, '更新失败，标签不存在', false)
    }
  }
  static async list(ctx){
    const list = await tagModel.findTagList();
    ctx.body = result({list}, '查询成功')
  }
  
}

module.exports = TagController
