const moment = require('moment');
const sequelize= require('../config/db');
const Attendance = sequelize.import('../schema/attendance');
// 通过 sync 方法同步数据结构
// 即,创建表
Attendance.sync({force: false})


class AttendanceModel{
  /**
   * 打卡
   * @returns {Promise<boolean>}
  */
  static async update(playoad){
    let date = moment().format('YYYY-MM-DD hh:mm:ss');
    let createdAt = moment().startOf('day').format('YYYY-MM-DD hh:mm:ss');
    const { class_id, userId, comment, ana} = playoad;
    let isAttend = 1;
    return await Attendance.update({
      class_id,
      userId,
      comment,
      // ana,
      isAttend,
      date
    },{
      where:{
        userId,
        createdAt
      }
    })
  }

}
module.exports =  AttendanceModel
