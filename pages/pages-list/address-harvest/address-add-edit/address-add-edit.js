// pages/pages-list/address-harvest/address-add-edit/address-add-edit.js
const { api, tool } = getApp()
import throttle from "../../../../hook/use-throttle"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [
      { name: '联系人', value: '', placeholder: '请输入联系人', maxlength: 30 },
      { name: '手机号码', value: '', placeholder: '请输入手机号码', maxlength: 11 },
      { name: '选择地区', value: '', placeholder: '省、市、区' },
      { name: '街道地址', value: '', placeholder: '小区楼栋/乡村名称', maxlength: 15 },
      { name: '设为默认', value: 0, placeholder: '' },
    ],//地址
    type: '',//编辑类型 1添加 2编辑
    id: '',//收货地址id
  },
  // 选择是否默认地址 
  defaultClick() {
    this.setData({ ['address[4].value']: this.data.address[4].value === 0 ? 1 : 0 })
  },
  // input输入触发
  inputChange({ currentTarget: { dataset: { index } }, detail: { value } }) {
    this.data.address[index].value = value
  },
  // picker点击确认触发
  pickerChange({ detail: { value } }) {
    this.setData({ ['address[2].value']: value.join('、') })
  },
  // 设置导航栏标题
  setNavTitle(type) {
    this.data.type = type;
    tool.setTitle(type == 1 ? '添加地址' : '编辑地址')
  },
  // 编辑信息覆盖
  editCopy(address) {
    const { id, real_name, phone, province, city, district, detail, is_default } = address
    this.data.id = id
    this.setData({
      ['address[0].value']: real_name,
      ['address[1].value']: phone,
      ['address[2].value']: `${province}、${city}、${district}`,
      ['address[3].value']: detail,
      ['address[4].value']: Number(is_default),
    })
  },
  // 点击保存地址按钮
  saveAddressClick: throttle(async function () {
    if(this.validationAddressInfo() !== true) return
    await this.apiAddEditAddress()
    await tool.alert("保存成功", 1000, 1)
    tool.jump_back()
  }),
  // 验证地址信息
  validationAddressInfo() {
    const realName = this.data.address[0].value
    if(realName.trim() === '') return tool.alert(this.data.address[0].placeholder)
    const vRealName = /^[\u4e00-\u9fa5|a-z|^\s]{2,20}$/;
    if(vRealName.test(realName) === false) return tool.alert('姓名格式不正确')
    const phone = this.data.address[1].value
    if(phone.trim() === '') return tool.alert(this.data.address[1].placeholder)
    const vPhone = /^1\d{10}$/;
    if(vPhone.test(phone) === false) return tool.alert('手机号码格式不正确')
    const region = this.data.address[2].value
    if(region.trim() === '') return tool.alert('请选择省市区信息')
    const detail = this.data.address[3].value
    if(detail.trim() === '') return tool.alert('请填写详细地址')
    if(detail.trim().length < 3) return tool.alert('详细地址过短')
    return true
  },
  //#region API
  // 新增编辑地址
  apiAddEditAddress() {
    const { id, address } = this.data
    const region = address[2].value.split('、')
    return api[this.data.type == 1 ? 'addAddress' : 'editAddress']({
      id,
      real_name: address[0].value,
      phone: address[1].value,
      province: region[0],
      city: region[1],
      district: region[2],
      detail: address[3].value,
      is_default: address[4].value,
    })
  },
  //#endregion
  /**
   * 生命周期函数--监听页面加载
   * type  1 添加地址 2 编辑地址
   */
  onLoad: function ({ type, address }) {
    this.setNavTitle(type)
    if(type == 2) { this.editCopy(JSON.parse(address)) }
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