// pages/pages-list/vip-index/vip-index.ts
import useLoadMore from "../../../hook/use-load-more"
import useLoadMoreJudge from "../../../hook/use-load-more-judge"
import apiVipDetail from "../../../private/api-vip-detail"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZG1pbjg2MTI1IiwiaWF0IjoxNjYxNTAzNzM3LCJleHAiOjE2NjIxMDg1MzcsIm5iZiI6MTY2MTUwMzczNywic3ViIjoiZTg3MGY5Y2Q1NjRkYTQzZDJhNmJlNGFhOGVhMWRjNjAiLCJqdGkiOiIwZTM3ZDY5Y2NkNTMzNzU3Yjc1YzFhMTg2NGQzODNiZiIsImNsYWltIjp7InZpcF91c2VyIjo0fX0.enPncqoHwutiCF1VOned3FvPmKU8Nl2ZJhqhySO3rRk`,
    timer: 0,//定时器
    time: 0,//进入页面时间
    typeList: ['居家自采产品', '预约采样产品'],//自采预约
    typeIndex: 0,//当前类型索引 0自采 1预约
    list: [{},{}],//商品列表
    page: 0,//页码
    loadMoreType: 1,//列表加载类型
    $state: { limit: 10 }
  },
  // 点击列表项
  goodsItemClick({ currentTarget: { dataset: { goods_id } } }: CurrentTarget<number>) {
    getApp().tool.jump_nav(`/pages/pages-list/goods-details/goods-details?goods_id=${goods_id}`)
  },

  // 点击tab项
  tabItemClick({ currentTarget: { dataset: { index } } }: Index) {
    if(this.data.typeIndex === index) return
    this.data.page = 0
    this.data.loadMoreType = 1
    this.setData({ 
      typeIndex: index,
      list: [],
      loadMoreType: 1
    })
    this.apiVipGoods()
  },

  // 进入首页
  goHome() {
    getApp().tool.jump_swi('/pages/index/index')
  },

  // 进入购物车
  goCart() {
    // getApp().tool.jump_nav('/pages/pages-list/vip-cart/vip-cart')
    getApp().tool.jump_nav('/pages/cart/cart')
  },

  // 初始化定时器
  initTimer() {
    this.data.time = 0
    clearInterval(this.data.timer)
    this.data.timer = setInterval(() => {
      this.setData({ time: this.data.time + 1 })
    }, 1000)
  },

  // 获取商品列表
  apiVipGoods() {
    if(useLoadMoreJudge(this)) return
    const { vipToken, vipId } = getApp().store.getState()
    const { typeIndex } = this.data
    const page = this.data.page + 1
    getApp().api.vipGoods({
      vip_token: vipToken,
      id: vipId,
      type: typeIndex + 1,
      page,
    }).then(({ data }: Body<[]>) => {
      this.setData({
        list: page === 1 ? data : this.data.list.concat(data),
        page,
        loadMoreType: useLoadMore(data, page, this.data.$state.limit)
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.apiVipGoods()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    await apiVipDetail()
    this.initTimer()
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
    this.apiVipGoods()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})