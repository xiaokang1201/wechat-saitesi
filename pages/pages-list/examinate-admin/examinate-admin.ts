// pages/pages-list/examinate-admin/examinate-admin.ts
import useLoadMore from "../../../hook/use-load-more"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    loadMoreType: 1,
    index: 0,//编辑索引
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
    getApp().api.personAddressList().then(({ data }: Body<[]>) => {
      this.setData({
        list: data,
        loadMoreType: useLoadMore(data, false)
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