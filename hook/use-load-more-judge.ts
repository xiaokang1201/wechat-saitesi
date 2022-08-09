/**
 * 判断是否在加载状态中的方法
 * @param { Object } _this 当前页面this
 * @param { String } loadMoreField 加载状态字段 默认值 'loadMoreType'
 * @param { Number } status 加载状态 默认值 1 加载中
 * @param { Number } replaceStatus 更替中的加载状态 默认值 -1
 * @return { Boolean } true 非加载状态 false 加载状态
 */

export default function (_this: any, loadMoreField: string = 'loadMoreType', status: number = 1, replaceStatus: number = -1) {
  if(_this.data[loadMoreField] !== status) return true
  _this.setData({ [loadMoreField]: status })
  _this.data[loadMoreField] = replaceStatus
  return false
}