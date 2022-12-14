// pages/index/index.ts"
import useLoadMore from "../../hook/use-load-more"
import apiUserDetail from "../../private/api-user-detail"
import apiGetConfig from "../../private/api-get-config"

interface data extends List {
  swiperList: SwiperList,
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
  // 获取胶囊信息
  getSystemInfo() {
    wx.getSystemInfo({
      success: e => {
        this.setData({
          statusBar: e.statusBarHeight
        })
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.setData({
            custom: capsule,
            customBar: capsule.bottom + capsule.top - e.statusBarHeight
          })
        } else {
          this.setData({
            customBar: e.statusBarHeight + 50,
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad({ goods_id, did, scene }) {
    // goods_${goods_id}_${did}
    console.log('进入首页携带参数 goods_id, did', goods_id, did)

    if(!!scene) {
      const sceneArr = scene.split('_')
      if(sceneArr[0] === 'goods') {
        goods_id = sceneArr[1]
        did = sceneArr[2]
      }
    }
    // 获取用户详情
    getApp().tool.loading()
    await apiUserDetail()
    apiGetConfig()
    // 获取首页数据
    this.apiGetBanner()
    this.apiHotGoods()
    this.apiNoticeHot()
    this.getSystemInfo()
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