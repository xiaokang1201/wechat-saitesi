// const ASSETSURL = 'https://img.vrupup.com/web/xk/songxiadati/images/'
const ASSETSURL = '/assets/images/'
export default {
  //核弹系统码
  CONFIGURE: "tJ4GXH2P2luArDVm0u9",
  //接口请求url
  REQUESTURL: 'https://game.vrupup.com/sanguo/shaomin/applet/sts/public/index.php/api/',
  //线上cdn资源url
  ASSETSURL,
  //每次打开小程序是否自动更新头像昵称
  UPDATEUSERINFO: false,
  //每次打开小程序是否自动检查更新最新版本
  APPLYUPDATE: true,
  //默认配置全局分享
  SHAREINFO: {
    title: "松下答题游戏",
    path: "pages/index/index",
    imageUrl: `${ASSETSURL}share.jpg`
  }
}