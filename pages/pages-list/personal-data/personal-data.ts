// pages/pages-list/personal-data/personal-data.ts
import apiConfig from '../../../utils/api/api.config'
interface data {
  sex: string[],
  userInfo: {
    sex: number, 
    birth: string
    province: string, 
    city: string, 
    area: string,
    avatar: string,
    nickname: string,
  },
  $state: {
    userInfo: {
      sex: number, 
      birth: string
      province: string, 
      city: string, 
      area: string,
      avatar: string,
      nickname: string,
    }
  }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: ['女', '男'],
    userInfo: {
      nickname: '',
      avatar: '',
      sex: 0, 
      birth: '',
      province:'', 
      city: '', 
      area: ''
    }
  } as data,

  // 修改头像
  chooseImage() {
    getApp().tool.chooseImage().then(({ tempFilePaths }: Body<string>) => {
      getApp().tool.uploadFiles(tempFilePaths, getApp().api.upload()).then((res: string[]) => {
        console.log('res[0]', res[0])
        this.setData({ ['userInfo.avatar']: res[0] })
      })
    })
  },

  // 修改昵称
  nicknameChange({ detail: { value } }: Detail<string>) {
    this.setData({ ['userInfo.nickname']: value })
  },

  // 勾选性别
  sexChange({ detail: { value } }: Detail<string>) {
    this.setData({ ['userInfo.sex']: value })
  },

  // 勾选年龄
  birthChange({ detail: { value } }: Detail<string>) {
    this.setData({ ['userInfo.birth']: value })
  },

  // 勾选日期
  regionChange({ detail: { value } }: Detail<string>) {
    this.setData({ 
      ['userInfo.province']: value[0],
      ['userInfo.city']: value[1],
      ['userInfo.area']: value[2]
    })
  },

  // 修改个人资料
  apiUploadUserInfo() {
    const { sex, birth, province, city, area, avatar, nickname } = this.data.$state.userInfo
    apiConfig.uploadUserInfo({ birth, sex, province, city, area, avatar, nickname }).then(async ({ msg }: { msg: string }) => {
      await getApp().tool.alert(msg)
      getApp().tool.jump_back()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      userInfo: this.data.$state.userInfo
    })
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