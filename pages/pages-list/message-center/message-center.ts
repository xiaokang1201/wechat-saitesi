// pages/pages-list/message-center/message-center.ts
import useLoadMore from "../../../hook/use-load-more"
import useLoadMoreJudge from "../../../hook/use-load-more-judge"
import api from "../../../utils/api/api"

interface data extends List, $State{

}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 0,
    loadMoreType: 1
  } as data,


  apiMyMsg() {
    if(useLoadMoreJudge(this)) return
    const page = this.data.page + 1
    api.myMsg({  page }).then(({ data }: { data: [] }) => {
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
    this.apiMyMsg()
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
    this.apiMyMsg()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})