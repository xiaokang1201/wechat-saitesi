import applyUpdate from './utils/apply-update'
import store from './utils/store/index'
import setAllShare from './utils/set-all-share'
import api from './utils/api/api'
import tool from './utils/publics/tool'
App<IAppOption>({
  onLaunch() {
    applyUpdate()//自动更新小程序
    setAllShare()//全局分享
  },
  api,//API请求
  tool,//微信API封装方法
  store,//状态管理
  globalData: {}//全局对象
})