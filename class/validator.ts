const { tool } = getApp()

export default class Validator {
  // 统一处理方法
  dispose(value: boolean, msg: string) {
    if(value) tool.alert(msg)
    return value
  }
  // 是否为空
  isEmpty = (value: string, msg: string) => {
    return this.dispose(value.trim() === '' || value === null || value === undefined, msg)
  }
  // 手机号
  isMobile = (value: string, msg: string) => {
    const vMobile = /^1[3-9][0-9]{9}$/;
    return this.dispose(!vMobile.test(value), msg)
  }
  // 姓名格式 中英文 2-20
  isName = (value: string, msg: string) => {
    const vName = /^[\u4e00-\u9fa5|a-z|^\s]{2,20}$/;
    return this.dispose(!vName.test(value), msg)
  }
}