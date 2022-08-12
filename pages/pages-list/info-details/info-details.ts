// pages/pages-list/info-details/info-details.ts

import useThrottle from "../../../hook/use-throttle"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadMoreType: 1 as number,//列表加载类型
    page: 0 as number,//页码
    list: [{},{}] as object[],//列表
    keyboardHeight: 0 as number,//键盘弹起高度
    id: 0 as number,//资讯id
    detail: { } as { detail: string },//详情
    content: '',//评论
  },

  // 点击评论
  releaseClick: useThrottle(function (this: any) {
    this.apiNoticeComment()
  }),

  // 发布评论
  apiNoticeComment() {
    const { id, content } = this.data
    getApp().api.noticeComment({ nid: id, content }).then(() => {
      getApp().tool.alert('发布成功', 1000 ,1)
      this.apiNoticeDetail()
    })
  },

  // 输入评论
  contentChange({ detail: { value } }: Detail<string>) {
    this.data.content = value
  },

  // 获取资讯详情
  apiNoticeDetail() {
    type noticeDetail = { data: { comments: object[], detail: { detail: string } } }
    getApp().api.noticeDetail({ id: this.data.id }).then(({ data: { comments, detail } }: noticeDetail) => {
      this.setData({
        list: comments,
        detail,
        nodes: detail.detail
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ id }) {
    wx.onKeyboardHeightChange(res => {
      this.setData({
        keyboardHeight: res.height
      })
    })
    this.data.id = Number(id)
    this.apiNoticeDetail()
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