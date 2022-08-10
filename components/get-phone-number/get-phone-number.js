// components/getPhoneNumber/getPhoneNumber.js
import apiConfig from '../../utils/api/api.config'
import gets from '../../utils/api/authorization'
import tool from '../../utils/publics/tool'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    curPage: {
      type: Object,
      value: {}
    }
  },
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的初始数据
   */
  data: {
  },
  ready() {
    if (!wx.getStorageSync('userInfo').mobile) {
      // this.showHideModal()
      this.myLogin()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //登录
    myLogin() {
      gets.login().then(value => {
        return apiConfig.getOpenid({
          js_code: value.code
        })
      }).then(({ code, data: { session_key  } }) => {
        if (code == 1) {
          this.data.session_key = session_key
          console.log("【拿到session_key】", this.data.session_key)
        } else {
          console.log("【服务器异常，请稍后再试】")
        }
        tool.loading_h()
      })
    },
    //点击获取手机号按钮
    getPhoneNumberUserInfo(e) {
      console.log('getPhoneNumberUserInfo', e)
      tool.loading("")
      if (e.detail.encryptedData) {
        this.data.encryptedData = e.detail.encryptedData
        console.log("【拿到encryptedData】", e.detail.encryptedData)
        this.data.iv = e.detail.iv
        this.decryptPhone()
      } else { 
        this.triggerEvent("getPhoneCallback", { status: false })
      }
      tool.loading_h()
    },
    //解密手机号
    decryptPhone() {
      let _data = {
        e_data: encodeURIComponent(this.data.encryptedData),
        session_key: encodeURIComponent(this.data.session_key),
        iv: encodeURIComponent(this.data.iv)
      }
      apiConfig.getPhoneNumber(_data).then(({ code, data: { mobile } }) => {
        console.log('apiConfig getPhoneNumber', code)
        if (code == 1) {
          let userInfo = wx.getStorageSync("userInfo") || {}
          userInfo.mobile = mobile
          getApp().store.setState({ userInfo })
          wx.setStorageSync("userInfo", userInfo)
          this.triggerEvent("getPhoneCallback", { status: true, mobile })
        } else {
          console.log("【手机号解密失败】")
        }
        tool.loading_h("")
      })
    }
  } 
})

