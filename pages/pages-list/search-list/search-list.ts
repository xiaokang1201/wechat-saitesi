// pages/pages-list/search-list/search-list.ts
import useLoadMore from '../../../hook/use-load-more'
import useLoadMoreJudge from '../../../hook/use-load-more-judge'
import useThrottle from '../../../hook/use-throttle'
interface data extends List, $State{
  list: GoodsList[]
}
interface detail {
  detail: string
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: true,//输入框进入聚焦
    keyword: "",//关键字
    showHistory: true,//显示搜索历史
    searchHistoryList: [],//搜索历史
    list: [],//列表
    page: 0,//页码
    loadMoreType: 1,//列表加载状态
  } as data,
  // 刷新
  refresh() {
    this.data.page = 0
    this.data.loadMoreType = 1
    this.setData({
      list: [],
      loadMoreType: 1
    })
  },

  // 输入框输入
  inputchange({ detail }: { detail: string }) {
    if(detail.trim() === '') this.setData({ showHistory: true })
  },

  // 点击搜索 detail -> inputValue
  searchClick: useThrottle(function (this: any, { detail }: detail) {
    this.refresh()
    this.addSearchHistory(detail)
    this.apiGoodsList(detail)
    this.setData({ showHistory: false })
  }),

  // 搜索记录初始化
  initSearchHistory() {
    this.setData({
      searchHistoryList: getApp().tool.storage('searchHistoryList')
    })
  },

  // 搜索记录过滤
  addSearchHistory(keyword: string) {
    if(keyword.trim() === '') return
    const searchHistoryList = getApp().tool.storage('searchHistoryList') || [];
    // 已存在不记录
    if(searchHistoryList.includes(keyword)) return
    searchHistoryList.unshift(keyword)
    // 长度超过10个 删除最后一个
    if(searchHistoryList.length > 10 ) searchHistoryList.pop()
    this.setData({ searchHistoryList })
    getApp().tool.storage('searchHistoryList', searchHistoryList)
  },

  // 点击单个搜索记录 detail -> keyword
  historyItemClick({ detail }: detail) {
    this.refresh()
    this.apiGoodsList(detail)
    this.setData({ showHistory: false, keyword: detail })
  },

  // 点击删除搜索历史记录
  deleteSearchHistoryClick() {
    this.setData({ searchHistoryList: [] })
    getApp().tool.storage('searchHistoryList', [])
  },

  // 商品列表
  apiGoodsList(keyword = '') {
    if(useLoadMoreJudge(this)) return
    const page = this.data.page + 1
    getApp().api.goodsList({ page, keyword: keyword.trim() }).then(({ data }: Body<GoodsList[]>) => {
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
    this.initSearchHistory()
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
    this.apiGoodsList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})