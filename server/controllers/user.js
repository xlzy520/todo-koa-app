const bcrypt = require('bcryptjs'); // 密码加密
const jwt = require('jsonwebtoken'); // 签发token给前端
const koajwt = require('koa-jwt')
const secret = require('../config/secret');
const userModel = require('../modules/user');
const statusCode = require('../utils/status-code');
const result = require('../utils/result');
const error_msg = require('../utils/error_msg');


class UserController {
  /**
   * 创建用户
   * @param ctx
   * @returns {Promise<void>}
   */
  static async register(ctx, next) {
    const user = ctx.request.body;

    const { username } = user
    if (username) {
      // 查询用户名是否重复
      const existUser = await userModel.findUserByName(username)
      if (existUser && existUser.length !== 0) {
        // 反馈存在用户名
        // ctx.response.status = 200;
        ctx.body = result(null, error_msg.USER_EXIST, false)
      } else {
        // 加密密码
        const salt = bcrypt.genSaltSync();  // 密码加密的计算强度默认10级
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
        
        // 创建用户
        await userModel.create(user);
        let newUser = await userModel.findUserByName(username)
        // newUser = newUser.map(x => x.get({plain:true})) // 等价于 JSON.parse(JSON.stringify(newUser) // 等价于查询语句加 raw: true
        
        // 签发token
        const userToken = {
          username,
          id: newUser.id
        }
        
        // 储存token失效有效期1小时
        const token = jwt.sign(userToken, secret.sign, {expiresIn: '2d'});
        
        ctx.response.status = 200;
        ctx.body = result({
          token,
          newUser
        },'创建用户成功')
      }
    } else {
      // 参数错误
      ctx.response.status = 200;
      ctx.body = result( null, '创建失败，参数错误', false);
    }
  }
  
  /**
   * 创建用户
   * @param ctx
   * @returns {Promise<void>}
   */
  static async getUserList(ctx, next) {
    // let userList = ctx.request.body;
    // if (userList) {
    //     const data = await userModel.findAllUserList();
    
    //     ctx.response.status = 200;
    //     ctx.body = statusCode.SUCCESS_200('查询成功', data)
    // } else {
    
    //     ctx.response.status = 412;
    //     ctx.body = statusCode.ERROR_412('获取失败')
    
    // }
    let data = await userModel.findAllUserList();
    
    
    ctx.response.status = 200;
    ctx.body = statusCode.SUCCESS_200('查询成功', data)
  }
  
  /**
   * 登录
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async login(ctx, next) {
    const data = ctx.request.body;
    const {phone, password} = data
    // 查询用户是否存在
    const user = await userModel.findUserByPhone(phone);
    // 查询用户密码是否正确
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const userToken = {
          phone,
          id: user.id
        }
        // 签发token
        const token = jwt.sign(userToken, secret.sign, {expiresIn: '1h'});
        
        ctx.response.status = 200;
        ctx.body = result({
          id: user.id,
          phone,
          token: token
        }, '登录成功')
      } else {
        ctx.body = result(null, '用户名或密码错误', false);
      }
    } else {
      
      // ctx.response.status = 403;
      ctx.body = result(null, '用户不存在', false);
    }
  }
  
  static async getUserInfo(ctx, next) {
    const username = '执笔'
    let userInfo = await userModel.findUserByName(username)
    if (userInfo) {
      ctx.body = result(userInfo, '查询成功')
    } else {
      ctx.body = result(null, error_msg.USER_INFO_NOT_EXIST, false)
    }
  }
  
  static async getQuestion(ctx, next) {
    const { phone } = ctx.request.body;
    const userInfo = await userModel.findUserByPhone(phone)
    if (userInfo) {
      const question = userInfo.question
      ctx.body = result({
        question
      }, '查询成功')
    } else {
      ctx.body = result(null, error_msg.phone_not_exist, false)
    }
  }
  
  static async resetPassword(ctx, next) {
    let { phone, answer, newPassword } = ctx.request.body;
    if (!newPassword) {
      ctx.body = result(null, error_msg.password_null, false)
    }
    const userInfo = await userModel.findUserByPhone(phone)
    if (userInfo) {
      if (answer === userInfo.answer) {
        const salt = bcrypt.genSaltSync();  // 密码加密的计算强度默认10级
        const hash = bcrypt.hashSync(newPassword, salt);
        await userModel.resetPassword(userInfo, hash)
        ctx.body = result()
      } else {
        ctx.body = result(null, error_msg.answer_error, false)
      }
    } else {
      ctx.body = result(null, error_msg.phone_not_exist, false)
    }
  }
  
  static async getUserByName(ctx, next) {
    // let userList = ctx.request.body;
    // if (userList) {
    //     const data = await userModel.findAllUserList();
    
    //     ctx.response.status = 200;
    //     ctx.body = statusCode.SUCCESS_200('查询成功', data)
    // } else {
    
    //     ctx.response.status = 412;
    //     ctx.body = statusCode.ERROR_412('获取失败')
    
    // }
    const username = '执笔'
    let userInfo = await userModel.findUserByName(username)
    if (userInfo) {
      ctx.body = result(userInfo, '查询成功')
    } else {
      ctx.body = result(null, error_msg.USER_INFO_NOT_EXIST, false)
    }
    
    // ctx.response.status = 200;
  }
  
}

module.exports = UserController
