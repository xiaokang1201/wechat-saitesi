/**
 * debounce 防抖方法
 * @param { Function } func 函数
 * @param { Number } delay 时间
 */

export default  function (func: Function, delay: number = 500) {
  let timer: number;
  return function(this: any) {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      func.apply(context, args);
    }, delay);
  }
}