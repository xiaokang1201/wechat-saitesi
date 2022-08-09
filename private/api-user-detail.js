
const  { api, tool } = getApp()
export default function apiUserDetail() {
  return new Promise((resovle, reject) => {
    api.userDetail().then(({ data }) => {
      const userInfo = wx.getStorageSync("userInfo") || {}
      Object.assign(userInfo, data)
      getApp().store.setState({ userInfo })
      tool.storage('userInfo', userInfo)
      resovle(data)
    }).catch(err => reject(err))
  })
}