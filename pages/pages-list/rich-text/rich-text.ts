// pages/pages-list/rich-text/rich-text.ts
interface data {
  $state: {
    userConfig: {
      rules: string,
      about: string,
      help: string
    },
    vipDetail: {
      rule: string
    }
  },
  nodes: string
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nodes: '',//富文本
  } as data,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ type }: Body<string>) {
    switch(type) {
      case '1':
        getApp().tool.setTitle('分销员规则')
        this.setData({ nodes: this.data.$state.userConfig.rules })
        break;
      case '2':
        getApp().tool.setTitle('关于我们')
        this.setData({ nodes: this.data.$state.userConfig.about })
        break;
      case '3':
        getApp().tool.setTitle('使用帮助')
        this.setData({ nodes: this.data.$state.userConfig.help })
        break;
      case '4':
        getApp().tool.setTitle('活动规则')
        this.setData({ nodes: this.data.$state.vipDetail.rule })
        break;
    }
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