// pages/pages-list/examinate-add-edit/examinate-add-edit.ts
import useThrottle from "../../../hook/use-throttle"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',//受检id
    type: 1 as number,//1 新增 2编辑
    certificate: ['中国居民身份证', '港澳居民来往内地通行证', '台湾居民来往内地通行证', '护照', '港澳居民居住证', '外国人永久居留身份证'],
    isSelf: 0,//0 受检人本人 1 受检人法定监护人
    name: '',//姓名
    age: '',//年龄
    gender: 1,//性别 0女 1男	
    cardType: '',//证件类型
    cardNo: '',//身份证号码  
    birth: '',// 出生年月  	
    mobile: '',// 手机  
    guardianName: '',//监护人姓名
    guardianCard: '',//监护人身份证 
    show: false,//删除弹框
  },

  // 删除
  apiDelPersonAddress: useThrottle(async function (this: any) {
    await getApp().api.delPersonAddress({ address_id: this.data.id })
    await getApp().tool.alert('删除成功')
    getApp().tool.jump_back()
  }),

  // 关闭弹框
  shutDown() {
    this.setData({ show: false })
  },

  // 点击删除
  deleteClick() {
    this.setData({ show: true })
  },

  // 选择证件类型
  certificateChange({ detail: { value } }: Detail<string>) {
    this.setData({ cardType: this.data.certificate[Number(value)] })
  },

  // 选择生日
  birthChange({ detail: { value } }: Detail<string>) {
    this.setData({ birth: value })
  },

  // 修改性别
  setGender({ currentTarget: { dataset: { gender } } }: CurrentTarget<number>){
    this.setData({ gender })
  },

  // 点击切换类型
  switchTypeClick({ currentTarget: { dataset: { index } } }: Index) {
    this.setData({ isSelf: index })
  },
  // 提交
  submit: useThrottle(async function (this: any) {
    await this.apiAddEditPersonAddress()
    getApp().tool.jump_back()
  }),

  // 新增编辑受检人
  apiAddEditPersonAddress() {
    const { id, type, name, isSelf, guardianName, guardianCard, age, birth, gender, mobile, cardNo, cardType } = this.data
    return getApp().api[type === 1 ? 'addPersonAddress' : 'editPersonAddress']({
      id,
      name,
      is_default: 0,
      is_self: isSelf === 0 ? 1 : 0,
      guardian_name: guardianName,
      guardian_card: guardianCard,
      age,
      birth,
      gender,
      card_no: cardNo,
      mobile,
      card_type: cardType
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ type }) {
    const numType = Number(type) || 1
    this.data.type = numType
    this.setData({ type: numType })
    getApp().tool.setTitle(`${numType === 1 ? '新增' : '编辑'}受检人`)
    if(numType === 2) {
      const pages = getCurrentPages(); //页面对象
      const { data: { list, index } } = pages[pages.length - 2]; //上一个页面对象
      console.log(list, index)
      console.log(list[index])
      const { id, is_self, name, age, gender, card_type, card_no, birth, mobile, guardian_name, guardian_card } = list[index]
      this.setData({
        id,//受检id
        isSelf: is_self === 1 ? 0 : 1,//0 受检人本人 1 受检人法定监护人
        name,//姓名
        age,//年龄
        gender,//性别 0女 1男	
        cardType: card_type,//证件类型
        cardNo: card_no,//身份证号码  
        birth,// 出生年月  	
        mobile,// 手机  
        guardianName: guardian_name,//监护人姓名
        guardianCard: guardian_card,//监护人身份证 
      })
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