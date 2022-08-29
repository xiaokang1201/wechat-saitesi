 
const { api, store } = getApp()
export default function apiVipDetail() {
  return new Promise((resovle, reject) => {
    api.vipDetail({ vip_token: store.$state.vipToken, id: store.$state.vipId }).then(({ data }) => {
       data.swiperList = data.thumb.map((item) => {
        return {
          image: item
        }
      })
      store.setState({ vipDetail: data })
      resovle()
    }).catch(err => reject(err))
  })
}