// pages/pages-list/after-sales/after-sales.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo: {},//商品信息,
  },

  // 点击退款
  afterSalesClick({ currentTarget: { dataset: { index } } }: Index) {
    getApp().tool.jump_nav(`/pages/pages-list/after-sales-apply/after-sales-apply?type=${index}&orderInfo=${JSON.stringify(this.data.orderInfo)}`)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ orderInfo }: Body<string>) {
    this.setData({ orderInfo: JSON.parse(orderInfo) })
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