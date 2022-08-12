// pages/index/index.ts"
import useLoadMore from "../../hook/use-load-more"
import apiUserDetail from "../../private/api-user-detail"
import apiGetConfig from "../../private/api-get-config"
import useJump from "../../hook/use-jump"

interface data extends List {
  swiperList: SwiperList,
  swiperIndex: number,
  currentIndex: number,
  tabList: string[],
  tabIndex: number,
  infoLoadMoreType: number,
  infoList: [] | object[],
  list: [] | GoodsList[],
}

type SwiperList = [] | { id: number; url: string; }[]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],//轮播列表
    swiperIndex: 0,//轮播图索引
    currentIndex: 0,//切换索引
    tabList: ['热门产品', '热门资讯'],//选项卡
    tabIndex: 0,//选项卡标记索引
    list: [],//商品列表
    loadMoreType: 1,//列表加载状态
    infoLoadMoreType: 1,//资讯列表加载状态
    infoList: [],//资讯列表
  } as data,

  // 点击搜索框
  searchClick() {
    getApp().tool.jump_nav(`/pages/pages-list/search-list/search-list`)
  },

  // 点击轮播图项
  swiperItemClick({ currentTarget: { dataset: { item: { type, url } } } }: CurrentTarget<{ type: number, url: string }>) {
    useJump(type, url)
  },
  
  // 轮播触发
  swiperChange({ detail: { current } }: swiperChange) {
    this.data.swiperIndex = current
    this.setData({
      currentIndex: current
    })
  },

  // 点击右箭头
  arrowRightClick() {
    const swiperIndex = this.data.swiperIndex + 1
    this.setData({ swiperIndex: swiperIndex <= this.data.swiperList.length - 1 ? swiperIndex : 0 })
  },

  // 点击预约采样产品
  reservationSamplingProductClick() {
    getApp().tool.storage('typeIndex', 1)
    this.toMall()
  },

  // 点击居家自采产品
  homePickProductsClick() {
    getApp().tool.storage('typeIndex', 0)
    this.toMall()
  },

  // 跳转商城
  toMall() {
    getApp().tool.jump_swi(`/pages/mall/mall`)
  },

  // 跳转资讯列表
  toInfos() {
    getApp().tool.jump_nav(`/pages/pages-list/infos/infos`)
  },

  // 点击选项卡项
  tabItemClick({ currentTarget: { dataset: { index } } }: Index) {
    this.setData({ tabIndex: index })
  },

  // 轮播图
  apiGetBanner() {
    getApp().api.getBanner({ position: 1 }).then(({ data }: Body<SwiperList>) => {
      this.setData({ swiperList: data })
    })
  },

  // 获取热门产品
  apiHotGoods() {
    getApp().api.hotGoods().then(({ data }: Body<GoodsList[]>) => {
      this.setData({ 
        list: data,
        loadMoreType: useLoadMore(data, false)
      })
    })
  },

  // 获取热门文章
  apiNoticeHot() {
    getApp().api.noticeHot().then(({ data }: Body<GoodsList[]>) => {
      this.setData({ 
        infoList: data,
        infoLoadMoreType: useLoadMore(data, false)
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad({ goods_id, did }) {
    console.log('进入首页携带参数 goods_id, did', goods_id, did)
    // 获取用户详情
    getApp().tool.loading()
    await apiUserDetail()
    apiGetConfig()
    // 获取首页数据
    this.apiGetBanner()
    this.apiHotGoods()
    this.apiNoticeHot()
    getApp().tool.loading_h()
    // 商品详情分享链接进入
    if(goods_id !== undefined) {
      getApp().tool.jump_nav(`/pages/pages-list/goods-details/goods-details?goods_id=${goods_id}&did=${did}`)
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