// pages/pages-list/set-up/set-up.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      { text: '地址管理', path: '/pages/pages-list/address-harvest/address-list/address-list' },
      { text: '意见反馈', },
      { text: '关于我们', path: '/pages/pages-list/rich-text/rich-text?type=2' },
      { text: '使用帮助', path: '/pages/pages-list/rich-text/rich-text?type=3' },
      { text: '受检人信息管理', path: '/pages/pages-list/examinate-admin/examinate-admin' }
    ]
  },  

  // 跳转页面
  jumpNav({ currentTarget: { dataset: { path } } }: CurrentTarget<string>) {
    getApp().tool.jump_nav(path)
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