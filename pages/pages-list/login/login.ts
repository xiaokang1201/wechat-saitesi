// pages/pages-list/login/login.ts
import useThrottle from "../../../hook/use-throttle"
import apiVipDetail from "../../../private/api-vip-detail"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '123456',//账号
    code: '123456',//邀请码
    show: false,//提示弹框
  },
  // 关闭弹框
  shutDown() {
    this.setData({ show: false })
  },
  // 输入账号
  accountChange({ detail: { value } }: Detail<string>) {
    this.data.account = value
  },
  // 输入邀请码
  codeChange({ detail: { value } }: Detail<string>) {
    this.data.code = value
  },
  // 登录
  apiVipLogin: useThrottle(function (this: any) {
    const { account, code } = this.data
    type vipLogin = { code: number, data: { vip_token: string } }
    getApp().api.vipLogin({ account, code }).then(({ code, data: { vip_token } }: vipLogin) => {
      console.log('code', code)
      if(code === 1) {
        getApp().store.setState({ vipToken: vip_token })
        apiVipDetail()
        getApp().tool.jump_nav(`/pages/pages-list/vip/vip`)
      }else if(code === 2) {
        this.setData({ show: true })
      }
    })
  }),
  // 重新输入
  again() {
    this.setData({
      code: '',
      account: '',
      show: false
    })
  },
  // 回到首页
  goIndex() {
    getApp().tool.jump_swi(`/pages/index/index`)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ scene }) {
    const sceneArr = scene?.split('_') || []
    if(sceneArr[0] === 'vipId') {
      getApp().store.setState({ vipId: sceneArr[1] })
    }
    wx.hideHomeButton()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})