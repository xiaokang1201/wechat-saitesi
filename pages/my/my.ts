// pages/my/my.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [
      { text: '待付款', path: '/pages/pages-list/since-mining-order/since-mining-order?index=1' },
      { text: '待发货', path: '/pages/pages-list/since-mining-order/since-mining-order?index=2' },
      { text: '待收货', path: '/pages/pages-list/since-mining-order/since-mining-order?index=3' },
      { text: '自提', path: '/pages/pages-list/since-mining-order/since-mining-order?index=4' },
      { text: '已完成', path: '/pages/pages-list/since-mining-order/since-mining-order?index=5' },
    ],//订单列表
    makeList: [
      { text: '待付款', path: '/pages/pages-list/inspection-booking/inspection-booking?index=1' },
      { text: '登记预约', path: '/pages/pages-list/inspection-booking/inspection-booking?index=2' },
      { text: '待采样', path: '/pages/pages-list/inspection-booking/inspection-booking?index=3' },
      { text: '检验中', path: '/pages/pages-list/inspection-booking/inspection-booking?index=4' },
      { text: '已完成', path: '/pages/pages-list/inspection-booking/inspection-booking?index=5' },
    ],//预约列表
    columnList: [
      { text: '消息中心', path: '/pages/pages-list/message-center/message-center' },
      { text: '领券中心', path: '/pages/pages-list/coupon-redemption-centre/coupon-redemption-centre'},
      { text: '分销中心', path: '/pages/pages-list/distribution-center/distribution-center' },
      { text: '设置', path: '/pages/pages-list/set-up/set-up'},
      { text: '客服聊天' },
    ],//竖列
  },
  
  // 跳转页面
  jumpNav({ currentTarget: { dataset: { path } } }: CurrentTarget<string>) {
    getApp().tool.jump_nav(path)
  },

  // 点击编辑资料
  editDataClick() {
    getApp().tool.jump_nav('/pages/pages-list/personal-data/personal-data')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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