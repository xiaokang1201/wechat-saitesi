// pages/pages-list/coupons/coupons.ts
import useLoadMore from "../../../hook/use-load-more"
import useLoadMoreJudge from "../../../hook/use-load-more-judge"

interface data extends List, $State {
  typeIndex: number
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],//列表
    page: 0,//页码
    loadMoreType: 1,//列表加载状态
    typeList: ['未使用', '已使用', '已过期'],//类型列表
    typeIndex: 0,//类型列表索引
  } as data,

  // 点击领取
  btnClick({ detail: { status } }: { detail: { status: number } }) {
    if(status === 0) {
      getApp().tool.jump_swi('/pages/mall/mall') 
    }
  },

  // 点击类型项
  typeItemClick({ detail }: { detail: number }) {
    if(this.data.typeIndex === detail) return
    this.data.typeIndex = detail
    this.data.loadMoreType = 1
    this.data.page = 0
    this.setData({ 
      typeIndex: detail,
      list: [],
      loadMoreType: 1
    })
    this.apiUserCoupon()
  },

  // 获取优惠券
  apiUserCoupon() {
    if(useLoadMoreJudge(this)) return
    const page = this.data.page + 1;
    getApp().api.userCoupon({ type: this.data.typeIndex+1, page }).then(({ data }: { data: never[]}) => {
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
    this.apiUserCoupon()
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
    this.apiUserCoupon()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})