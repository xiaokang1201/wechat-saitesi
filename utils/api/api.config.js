import { myRequest } from './request'
import config from '../../config'
export default {
  /** 
   ****模板默认接口【勿删】
   */ 
  /**
 * 接口请求封装
 * @param { Object } data 传参
 * @param { String } url 请求地址
 * @param { String } method 请求方式[默认为POST]
 * @param { Boolean } isOpenid 是否默认带上唯一标识[默认为false]
 * @param { Number } contentType content-type类型，0为application/x-www-form-urlencoded，1为application/json[默认为0]
 * @returns 请求结果
 */
  //核弹系统配置 
  configure: (data, url = `https://game.flyh5.cn/game/wx7c3ed56f7f792d84/data_system/api.php?a=web&code=${config.CONFIGURE}`) => { return myRequest(data, url, 'get', true, true) },
  //获取openid
  getOpenid: (data, url = 'oauth_login') => { return myRequest(data, url, 'post', false) },
  //上传头像昵称
  uploadUserInfo: (data, url = 'perfect_info') => { return myRequest(data, url, 'post') },
  //手机号解密
  getPhoneNumber: (data, url = 'de_mobile') => { return myRequest(data, url, 'post', false) },
}