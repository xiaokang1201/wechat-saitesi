// pages/mall/mall.ts

import useLoadMore from "../../hook/use-load-more"
import useLoadMoreJudge from "../../hook/use-load-more-judge"

interface data extends List, $State {
  personList: PersonList,
  personIndex: number,
  personDrawer: boolean,
  typeList: string[],
  typeIndex: number,
  typeDrawer: boolean,
  list: GoodsList[],
  sortIndex: number,
  sortList: { field: string, type: boolean }[],
  keyword: string
}
type PersonList = [] | [{
  id: number
  title: string
}]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',//关键词
    /* 适用人群 */
    personList: [],//列表
    personIndex: -1,//索引
    personDrawer: false,//抽屉
    /* 商品类型 */
    typeList: ['居家自采', '预约采样'],//列表
    typeIndex: 0,//索引
    typeDrawer: false,//抽屉
    /* 商品 */
    list: [],//列表
    page: 0,//页码
    loadMoreType: 1,//加载类型
    /* 排序  */
    sortIndex: -1,//排序  is_new 最新 price 价格 sales 销量   
    sortList: [
      { field: 'is_new', type: false },
      { field: 'price', type: false },
      { field: 'sales', type: false },
    ],//列表
  } as data,

  // 重置数据
  resetData() {
    this.data.page = 0
    this.data.loadMoreType = 1
    this.data.personIndex = -1
    this.data.sortIndex = -1
    this.data.list = []
    this.setData({
      loadMoreType: 1,
      personIndex: -1,
      sortIndex: -1,
      list: []
    })
  },

  // 点击排序
  sortClick({ currentTarget: { dataset: { index } } }: Index) {
    if(index === this.data.sortIndex) {
      this.data.sortList[index].type = !this.data.sortList[index].type
    }
    this.resetData()
    this.data.sortIndex = index
    this.setData({ sortIndex: index })
    this.apiGoodsList()
  },

  // 输入框点击搜索
  inputConfirm({ detail }: Body<string>) {
    this.data.keyword = detail
    this.data.page = 0
    this.data.loadMoreType = 1
    this.data.list = []
    this.setData({
      list: [],
      loadMoreType: 1
    })
    this.apiGoodsList()
  },

  // 点击类型
  typeClick() {
    this.setData({ typeDrawer: !this.data.typeDrawer })
  },

  // 切换类型项
  typeItemSwitch(index: number) {
    this.data.page = 0
    this.data.loadMoreType = 1
    this.data.list = []
    this.data.typeIndex = index
    this.setData({
      loadMoreType: 1,
      list: [],
      typeIndex: index
    })
    this.apiGoodsList()
  },

  // 点击类型项
  typeItemClick({ currentTarget: { dataset: { index } } }: Index) {
    this.typeItemSwitch(index)
  },

  // 点击适用人群抽屉遮罩层
  personDrawerMaskClick() {
    this.setData({ personDrawer: false })
  },
  
  // 点击适用人群
  personClick() {
    this.setData({ personDrawer: !this.data.personDrawer })
  },

  //点击适用人群项
  personItemClick({ currentTarget: { dataset: { index } } }: Index) {
    this.resetData()
    this.setData({ 
      personIndex: index,
      personDrawer: false
    })
    this.apiGoodsList()
  },

  // 获取适用人群
  apiPersonList() {
    getApp().api.personList().then(({ data }: Body<PersonList>) => {
      this.setData({ personList: data })
    })
  },

  // 获取商品数据
  apiGoodsList() {
    const { keyword, sortIndex, sortList, personList, personIndex, typeIndex, list } = this.data
    if(useLoadMoreJudge(this)) return
    const page = this.data.page + 1
    getApp().api.goodsList({ 
      type: typeIndex + 1,
      person_id: personIndex>=0 ? personList[personIndex].id : '',
      sort_type: sortIndex>=0 ? (sortList[sortIndex].type ? 'desc' : 'asc') : '',
      sort: sortIndex>=0 ? sortList[sortIndex].field : '',
      page,
      keyword
    }).then(({ data }: Body<GoodsList[]>) => {
      this.setData({
        list: page === 1 ? data : list.concat(data),
        page,
        loadMoreType: useLoadMore(data, page, this.data.$state?.limit)
      })
    })
  },

  // 上拉加载更多
  scrolltolower() {
    console.log('上拉加载更多')
    this.apiGoodsList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const typeIndex: number = getApp().tool.storage('typeIndex')
    if(typeof typeIndex !== 'number') {
      this.apiGoodsList()
    }
    this.apiPersonList()
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
    const typeIndex: number = getApp().tool.storage('typeIndex')
    if(typeof typeIndex === 'number') {
      this.typeItemSwitch(typeIndex)
      getApp().tool.storage('#typeIndex')
    }
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