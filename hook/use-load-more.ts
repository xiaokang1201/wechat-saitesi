/**
 * 列表加载状态方法
 * @param { Array } list 列表
 * @param { Number | Boolean } page 页码 | false不分页
 * @param { Number } limit 每页长度 
 * @return { Number } 列表加载状态 0 无数据 1 加载中 2 加载完
 */

export default function (list: Array<object> = [],  page: number | boolean = 1, limit: number = 20): 0 | 1 | 2 {
  return ((page === false || (page >= 1 && list.length < limit)) ? (list.length === 0 ? ((page === 1 || page === false) ? 0 : 2) : 2) : 1 )
}
