
// pages/pages-list/collection/collection.ts
import useLoadMore from "../../../hook/use-load-more"
import useLoadMoreJudge from "../../../hook/use-load-more-judge"
import useThrottle from "../../../hook/use-throttle"

interface data extends List, $State{
  name: string,
  list: GoodsList[]
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 0,
    loadMoreType: 1,
    name: ''
  } as data,

  // 点击搜索 detail -> inputValue
  inputConfirm: useThrottle(function (this: any, { detail }: Body<string>) {
    this.data.page = 0
    this.data.loadMoreType = 1
    this.data.list = []
    this.setData({ 
      list: [],
      loadMoreType: 1
    })
    this.apiMyCollection(detail)
  }),

  // 收藏商品列表
  apiMyCollection(name = '') {
    if(useLoadMoreJudge(this)) return
    const page = this.data.page + 1
    getApp().api.myCollection({ page, name: name.trim() }).then(({ data }: Body<GoodsList[]>) => {
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
    this.apiMyCollection()
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
    this.apiMyCollection()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})