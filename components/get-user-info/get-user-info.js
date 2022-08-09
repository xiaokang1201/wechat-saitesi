// components/get-user-info/get-user-info.js
import api from '../../utils/api/api'
import tool from '../../utils/publics/tool'
import login from '../../utils/api/login'
Component({
  /**
   * 组件的属性列表
   */ 
  properties: {
    curPage: {
      type: Object,
      value: {}
    },
    register: {
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
    baseurl: new getApp().globalData.ASSETSURL,//图片基本路径
  },
  ready() {
    this.setData({ canIUseGetUserProfile: wx.getUserProfile ? true : false })
  }, 
  /**
   * 组件的方法列表
   */
  methods: {
    //新版获取用户信息
    getUserProfile(userInfo) {
      login.getUserProfile(userInfo).then(res => { 
        console.log("【新版微信授权】", res)
        if (res.code) {
          console.log("【拒绝了授权】")
          this.triggerEvent("getUserInfoCallback", { status: false })
        } else if (!res.code) {
          this.triggerEvent("getUserInfoCallback", { status: true })
          tool.loading_h()
        }
      }).catch(err => {
        if (err.data.code == -1) this.getUserProfile({ userInfo: err.userInfo })
        // this.triggerEvent("getUserInfoCallback", { status: false, err })
      })

      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
      // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      // wx.getUserProfile({
      //   desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      //   success: res => {
      //     console.log("新版获取用户信息", res)
      //     login.authorize(res, this).then(res => {
      //       this.triggerEvent("getUserInfoCallback", { status: true })
      //     })
      //     tool.loading_h()
      //   }
      // })
    },
    //获取用户信息
    bindgetuserinfo(e) {
      console.log('【老版微信授权】', e)
      if (!e.detail.userInfo) {
        console.log("【拒绝了授权】")
        this.triggerEvent("getUserInfoCallback", { status: false })
        return
      } 
      login.authorize(e, this).then(res => {
        this.triggerEvent("getUserInfoCallback", { status: true })
      })
      tool.loading_h()
    } 
  }
})
