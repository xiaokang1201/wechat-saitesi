// pages/pages-list/after-sales-list/after-sales-list.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: ['售后申请', '处理中', '申请记录'],//类型列表
    typeIndex: 0,//类型列表索引
    list: [{}, {}, {}],//列表
    page: 0,//页码
    loadMoreType: 1,//列表加载状态
  },
  // 点击类型项
  typeItemClick({ detail }: { detail: number }) {
    if(this.data.typeIndex === detail) return
    this.data.typeIndex = detail
    // this.data.loadMoreType = 1
    // this.data.page = 0
    this.setData({ 
      typeIndex: detail,
      // list: [],
      // loadMoreType: 1
    })
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