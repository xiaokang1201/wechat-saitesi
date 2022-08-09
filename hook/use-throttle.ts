/**
 * throttle 节流方法
 * @param { Function } func 函数
 * @param { Number } delay 时间
 * @param { Boolean } immediate 立即执行
 */

export default function (func: Function, delay: number = 1000, immediate: boolean = true) {
  let prev = Date.now();
  return function(this: any, any: any) {
    const context = this;
    const args = arguments || any;
    const now = Date.now();
    if (now - prev >= delay || immediate) {
      immediate = false
      func.apply(context, args);
      prev = Date.now();
    }
  }
}

