// pages/pages-list/report-view/report-view.ts
import useLoadMore from "../../../hook/use-load-more"
import useLoadMoreJudge from "../../../hook/use-load-more-judge"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: ['自采检测报告', '预约检测报告'],//类型列表
    typeIndex: 0,//类型列表索引
    list: [],//列表
    page: 0,//页码
    loadMoreType: 1,//列表加载状态
    $state: { userConfig: { custom_mobile: '' } },
    date: '',//选择时间
  },

  // 时间筛选查看
  dataChange({ detail: { value } }: Detail<string>) {
    this.setData({ date: value })
    this.data.date = value
    this.refresh()
    this.apiMyReport()
  },

  // 点击查看报告
  lookReportClick({ currentTarget: { dataset: { url } } }: CurrentTarget<string>) {
    this.filePreview(url)
  },

  // 文件预览
  filePreview(url: string) {
    getApp().tool.loading()
    wx.downloadFile({//下载对应文件
      url, // 下载文件网络地址
      success(res) {   
        wx.openDocument({
          filePath: res.tempFilePath,// 装载对应文件的路径
          showMenu: true,// 右上角的菜单转发分享操作
          complete() {
            getApp().tool.loading_h()
          }
        })
      }
    })
  },

  // 刷新列表状态
  refresh() {
    this.data.loadMoreType = 1
    this.data.list = []
    this.setData({ 
      list: [],
      loadMoreType: 1
    })
  },

  // 点击类型项
  typeItemClick({ currentTarget: { dataset: { index } } }: Index) {
    if(this.data.typeIndex === index) return
    this.refresh()
    this.setData({ typeIndex: index })
    this.data.typeIndex = index
    this.apiMyReport()
  },

  // 拨打电话
  makePhoneCall() {
    wx.makePhoneCall({
      phoneNumber: this.data.$state.userConfig.custom_mobile
    })
  },

  // 获取我的报告
  apiMyReport() {
    if(useLoadMoreJudge(this)) return
    const { typeIndex, date } = this.data
    getApp().api.myReport({ status: typeIndex + 1, date }).then(({ data }: Body<[]>) => {
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
    this.apiMyReport()
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