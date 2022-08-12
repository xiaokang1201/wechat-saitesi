// pages/pages-list/comment-list/comment-list.ts
import useLoadMore from "../../../hook/use-load-more"
import useLoadMoreJudge from "../../../hook/use-load-more-judge"

const { api } = getApp()
interface data extends List, $State{
  goodsId: number
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: 0,//商品id
    page: 0,//页码
    list: [],//评论列表
    loadMoreType: 1,//列表加载状态
  } as data,
  // 全部评论列表
  apiGoodsComments() {
    if(useLoadMoreJudge(this)) return
    const page = this.data.page + 1
    api.goodsComments({ goods_id: this.data.goodsId, page}).then(({ data }: Body<[]>) => {
      this.setData({ 
        list: page === 1 ? data : this.data.list.concat(data),
        loadMoreType: useLoadMore(data, page, this.data.$state?.limit)
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ goodsId }) {
    this.data.goodsId = Number(goodsId)
    this.apiGoodsComments()
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
    this.apiGoodsComments()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})