// pages/pages-list/examinate/examinate.ts
type Examinate = { currentTarget: { dataset: { 
  item: {
    id: number,
    name: string
    card_type: string,
    card_no: string,
    mobile: string
  }
} } }
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',//关键词
    list: [],//列表
    index: 0,//编辑索引
    noExaminate: false,//暂无数据
  },

  // 点击受检人项
  itemClick({ currentTarget: { dataset: { item: { id, name, card_type, card_no, mobile } } } }: Examinate) {
    const pages = getCurrentPages()
    const prevpage = pages[pages.length - 2]; //上一个页面对象
    prevpage.setData({
      personAddressId: id,
      name, 
      cardType: card_type, 
      cardNo: card_no, 
      mobile
    })
    getApp().tool.jump_back()
  },

  // 搜索
  inputConfirm({ detail }: Body<string>) {
    this.data.keyword = detail
    this.apiPersonAddressList()
  },

  // 点击添加
  addClick() {
    getApp().tool.jump_nav(`/pages/pages-list/examinate-add-edit/examinate-add-edit?type=1`)
  },

  // 点击编辑
  editClick({ currentTarget: { dataset: { index } } }: Index) {
    this.data.index = index
    getApp().tool.jump_nav(`/pages/pages-list/examinate-add-edit/examinate-add-edit?type=2`)
  },

  // 获取受检人地址
  apiPersonAddressList() {
    getApp().api.personAddressList({ keyword: this.data.keyword }).then(({ data }: Body<[]>) => {
      this.setData({
        noExaminate: data.length === 0,
        list: data
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    
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
    this.apiPersonAddressList()
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