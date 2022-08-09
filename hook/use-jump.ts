const { tool } = getApp()

/**
 * 跳转链接方法
 * @param { Number } type 跳转类型  0 无跳转 1小程序页面 2外链
 * @param { String } url 跳转地址
 * @readonly 需要tabBar, webview页面路径
 */

export default function (type: number, url: string) {
  switch (type) {
    case 1: 
      const arr = ['/pages/my/my', '/pages/cart/cart', '/pages/activity/activity', '/pages/goods/goods', '/pages/index/index']
      arr.includes(url) ? tool.jump_swi(url) : tool.jump_nav(url)
    break;
    case 2: 
      tool.jump_nav(`/pages/pages-list/webview/webview?h5Url=${url}`)
    break;
    default:
      console.log("无跳转", type, url)
    break
  }
}