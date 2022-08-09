import useLoadMore from "../../../hook/use-load-more"
import useLoadMoreJudge from "../../../hook/use-load-more-judge"

// pages/pages-list/infos/infos.ts
interface data extends List, $State {
  keyword: string
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadMoreType: 1,//列表加载类型
    page: 0,//页码
    list: [] as object[],//列表
    keyword: '',//关键字
  } as data,

  // 点击搜索 detail -> value
  searchClick({ detail }: { detail: string }) {
    this.data.loadMoreType = 1
    this.data.page = 0
    this.data.list = []
    this.setData({
      list: []
    })
    this.data.keyword = detail
    this.apiNoticeIndex()
  },

  // 全部文章
  apiNoticeIndex() {
    if(useLoadMoreJudge(this)) return
    const page = this.data.page + 1
    getApp().api.noticeIndex({ page, keyword: this.data.keyword }).then(({ data }: { data: [] }) => {
      this.setData({
        list: page === 1 ? data : this.data.list.concat(data),
        page,
        loadMoreType: useLoadMore(data, page, this.data.$state?.limit)
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.apiNoticeIndex()
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
    this.apiNoticeIndex()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})