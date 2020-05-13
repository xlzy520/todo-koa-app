const router = require('koa-router')()


// 分页demo
router.get('/getProblemList', async ctx => {
  let { currentPage = 1 } = ctx.request.query
  let offset = (currentPage - 1) * 10;
  let userList = await Problem.findAndCountAll({
    //offet去掉前多少个数据
    offset,
    //limit每页数据数量
    limit: 10
  }).then(res => {
    let result = {};
    result.data = res.rows;
    result.total = res.count;
    return result;
  });
  ctx.body = userList;
})
