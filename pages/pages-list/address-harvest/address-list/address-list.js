// pages/pages-list/harvest-address/address-list/address-list.js
const { api, tool, store } = getApp()
import throttle from "../../../../hook/use-throttle"
const addressAddEditUrl = "/pages/pages-list/address-harvest/address-add-edit/address-add-edit";//新增修改地址页面路径
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [{}],//地址列表
  },
  // 点击单个地址修改为默认 detail -> address
  itemDefaultClick: throttle(async function ({ detail }) {
    await this.apiSetDefaultAddress(detail)
    this.apiAddressList()
  }),
  // 点击单个地址列表进入详情修改 detail -> address
  addressItemClick({ detail }) {
    store.setState({ addressInfo: detail })
    tool.jump_back()
  },
  // 点击单个地址列表进入修改地址页面详情 detail -> address
  addressItemEditClick({ detail }) {
    tool.jump_nav(`${addressAddEditUrl}?type=2&address=${JSON.stringify(detail)}`)
  },
  // 点击单个地址删除 detail -> id
  addressItemDeleteClick: throttle(async function ({ detail }) {
    await this.apiDelAddress(detail)
    this.apiAddressList()
  }),
  // 设为默认收货地址 
  apiSetDefaultAddress(address_id) {
    return api.setDefaultAddress({ address_id})
  },
  // 删除单个收货地址 
  apiDelAddress(address_id) {
    return api.delAddress({ address_id})
  },
  // 获取地址列表信息
  apiAddressList() {
    api.addressList().then(({ data }) => this.setData({ addressList: data }))
  },
  // 点击新增收货地址按钮
  addAddressClick() {
    tool.jump_nav(`${addressAddEditUrl}?type=1`)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.apiAddressList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})