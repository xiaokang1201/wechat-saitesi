import config from '../../config'
import auth from './authorization'
import tool from '../publics/tool'
// import { promiseFinally } from '../promise-finally.js'
// promiseFinally();//promise的finally配置
/**
 * 接口请求封装
 * @param { Object } data 传参
 * @param { String } url 请求地址
 * @param { String } method 请求方式[默认为POST]
 * @param { Boolean } isOpenid 是否默认带上唯一标识[默认为false]
 * @param { Number } contentType content-type类型，0为application/x-www-form-urlencoded，1为application/json[默认为0]
 * @returns 请求结果
 */
const myRequest = (data = {}, url, method = 'POST', isOpenid = false, contentType = 0) => {
  let header = { 'content-type': ['application/x-www-form-urlencoded', 'application/json'][contentType], 'token': 
  getApp().store.getState().userInfo.token 
  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZG1pbjg2MTI1IiwiaWF0IjoxNjYwMTE1NjYwLCJleHAiOjE2NjA3MjA0NjAsIm5iZiI6MTY2MDExNTY2MCwic3ViIjoiYjIwZjk2ZTU4NzhiMGE0N2ZmODYyNmM4Zjc1N2UzNWIiLCJqdGkiOiJiODhlNWE1MGNiMzc2YTQxYTQ1ZWI4YzViM2FhMmI0OSIsImNsYWltIjp7InVpZCI6MTgxfX0.iFMUwsh1iXtpmVJtcxq2KluFFrVJ9b_Snalpf-n338E'
}
  !(url.indexOf('http:') != -1 || url.indexOf('https:') != -1) && (url = `${config.REQUESTURL}${url}`)
  isOpenid && Object.assign(data, { openid: getApp().store.getState().userInfo.openid || wx.getStorageSync('userInfo').openid })
  return new Promise((resolve, reject) => {
    requestPromise(url, data, method, header).then(res => { resolve(res) }).catch(err => { reject(err) })
  })
}
const requestPromise = (url, data, method, header) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      header,
      success: res => {
        console.log("【原始封装请求返回】", res)
        if (res.statusCode !== 200) {
          tool.showModal("", `系统繁忙请稍后再试: ${res.statusCode}`, false)
          reject(res)
        } else {
          if (res.data.code == -1) {
            login().then(() => {
              header.token = getApp().store.getState().userInfo.token
              resolve(requestPromise(url, data, method, header));
            })
          } else {
            if(res.data.code === 2 || res.data.code === 1 || res.data.status === 0 || (res.data.data && res.data.data.status == 200)) { 
              resolve(res.data)
            } else {
              tool.alert(res.data.msg)
              reject(res)
            }
          }
        }
      },
      fail: err => {
        reject(err)
      }
    })
  }) 
}
const login = (get_session_key = 0) => {
  // updateUserInfo()
  return new Promise((resolve, reject) => {
    tool.loading("")
    auth.login().then(res => {
      return res
    }).then(res => {
      // return apiConfig.getOpenid({ js_code: res.code })
      return myRequest({ js_code: res.code }, 'oauth_login', 'post', false, 0)
    }).then(res => {
      tool.loading_h()
      if (get_session_key == 1) resolve({ session_key: res.data.session_key })
      let userInfo = wx.getStorageSync("userInfo") || {}
      Object.assign(userInfo, res.data.user_info)
      userInfo.token = res.data.token
      getApp().store.setState({ userInfo })
      wx.setStorageSync("userInfo", userInfo)
      resolve(res.data)
    }).catch(err => {
      tool.loading_h()
      reject(err) 
    })
  })
}

module.exports = {
  myRequest,
  login
}
