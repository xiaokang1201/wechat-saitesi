
const  { api, tool } = getApp()
export default function apiUserDetail() {
  return new Promise((resovle, reject) => {
    api.getConfig().then(({ data }) => {
      const userConfig = wx.getStorageSync("userConfig") || {}
      Object.assign(userConfig, data)
      getApp().store.setState({ userConfig })
      tool.storage('userConfig', userConfig)
      resovle(data)
    }).catch(err => reject(err))
  })
}