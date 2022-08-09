// const app = getApp()
//登录
const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        resolve(res)
      }
    })
  })
}
/*检查登录态会话密钥session_key是否过期*/
const isCheckSession = callback => {
  wx.checkSession({
    success() {
      callback(true)
    },
    fail() {
      callback(false)
    }
  })
}
/*查询用户是否否授权了 scope*/
const isSettingScope = scope => {
  return new Promise(resolve => {
    wx.getSetting({
      success(res) {
        if (res.authSetting[scope] === false ) {
          resolve({ status: 0, message: "用户已拒绝过授权" })
        } else if (res.authSetting[scope] === true ) {
          resolve({ status: 1, message: "用户已授权" })
        } else if (res.authSetting[scope] === undefined){
          resolve({ status: -1, message: "用户未进行过此授权" })
        }
      }
    })
  })
}
//发起授权
const authorize = scope=> {
  return new Promise((reject, resolve) => {
    wx.authorize({
      scope: scope,
      success () {
        reject()
      },
      fail(err) {
        resolve(err)
      }
    })
  })
} 
//打开授权系统列表设置
const openSetting = () => {
  return new Promise(reject => {
    wx.openSetting({
      success(res) {
        reject(res)
      }
    })
  })
}
module.exports = {
  isCheckSession,
  isSettingScope,
  login,
  authorize,
  openSetting
}