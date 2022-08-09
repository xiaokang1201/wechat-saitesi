import useLoadMore from "../../../hook/use-load-more"
import useLoadMoreJudge from "../../../hook/use-load-more-judge"
interface data extends  $State {
  page: number,
  loadMoreType: number
  list: List[]
}

interface List {
  type: number, 
  is_use: boolean,
  id: number
}

// pages/pages-list/coupon-redemption-centre/coupon-redemption-centre.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],//列表
    page: 0,//页码
    loadMoreType: 1,//列表加载状态
  } as data,

  // 一键领取
  aKeyReceiveClick() {
    const list = this.data.list.filter(item => item.type === 0)
    const strArr: number[] = []
    list.forEach(item => strArr.push(item.id))
    this.apiReceiveCoupon(strArr.join(','))
  },

  // 返回
  goBack() {
    getApp().tool.jump_back()
  },

  // 点击领取
  receiveClick({ detail: { id, is_use } }: Detail<number>) {
    // 0 未领取 1已领取  
    if(is_use === 0) {
      this.apiReceiveCoupon(id.toString())
    } else {
      getApp().tool.jump_swi('/pages/mall/mall') 
    }
  },

  // 领取优惠券
  apiReceiveCoupon(couponId: string) {
    getApp().api.receiveCoupon({ couponId }).then(({ msg }: Body<string>) => {
      this.data.page = 0
      this.data.list = []
      this.data.loadMoreType = 1
      this.setData({
        list: [],
        loadMoreType: 1
      })
      getApp().tool.alert(msg)
      this.apiCouponList()
    })
  },

  // 未领取优惠券
  apiCouponList() {
    if(useLoadMoreJudge(this)) return
    const page = this.data.page + 1
    getApp().api.couponList({ page }).then(({ data }: { data: List[] }) => {
      data.forEach(item => {
        item.type = item.is_use ? 1 : 0 
      })
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
    this.apiCouponList()
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
    this.apiCouponList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})