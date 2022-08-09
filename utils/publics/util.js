/**
 * 解析url中的参数
 * @param { String } url url地址
 * @param { String } name 参数名
 */
let getQueryString = (url, name) => {
  var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i')
  var r = url.substr(1).match(reg)
  if (r != null) {
    return r[2]
  }
  return null
}
/**
 * 获取当前时间
 */
const getDate = () => {
  let dates = new Date()
  let years = dates.getYear() //获取当前年份(2位)
  let year = dates.getFullYear()//获取完整的年份(4位)
  let month = dates.getMonth() + 1//获取当前月份(0-11,0代表1月)
  let date = dates.getDate()//获取当前日(1-31)
  let day = dates.getDay()//获取当前星期X(0-6,0代表星期天)
  let hours = dates.getHours() //获取当前小时数(0-23)
  let minute = dates.getMinutes() //获取当前分钟数(0-59)
  let second = dates.getSeconds() //获取当前秒数(0-59)
  let timeStamp = dates.getTime() //获取当前时间(从1970.1.1开始的毫秒数)
  let secs = dates.getMilliseconds() //获取当前毫秒数(0-999)
  let dateDate = dates.toLocaleDateString() //获取当前日期
  let dateTime = dates.toLocaleTimeString() //获取当前时间
  let dateDateTime = dates.toLocaleString() //获取日期与时间
  return { year, month, date, hours, minute, second, day, timeStamp, dateDateTime, dates: dateDateTime.split(' ')[0].replace(/\//g, '-') }
}
/**
 * 获取距离某个日期固定天数的日期
 * @param { Number } days 距离时间
 * @param { String } ori_data 参考时间
 */
const getDistance = (days = 7, ori_data) => {
  if (ori_data) ori_data = ori_data.replace(/-/g, "/")
  let date = ori_data ? new Date(ori_data) : new Date()
  date.setDate(date.getDate() + days)
  return { year: date.getFullYear(), month: date.getMonth() + 1, date: date.getDate(), dates: date.getFullYear() +"-"+ (date.getMonth()+1) +"-"+ date.getDate()}
}
/**
 * 时间戳转换时间
 * @param { Number } timestamp 时间戳(秒或毫秒)
 */
const timestampToTime = (timestamp) => {
  var date = new Date(timestamp.length == 13 ? timestamp : timestamp * 1000)//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth()+1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  return Y + M + D + h + m + s
}
/**
 * 倒计时
 * @param { Number } time 当前总时间（秒）
 * @param { String } symbols 拼接符
 */
const minutesAndSeconds = (time, symbols) => {
  let _d, _h, _m, _s
  _d = parseInt(time / 86400)
  _h = parseInt(time / 3600) - _d * 24
  _m = parseInt(time / 60) - _d * 1440 - _h * 60
  _s = parseInt(time) - _d * 86400 - _h * 3600 - _m * 60
  _d < 10 ? (_d = '0' + _d) : _d = String(_d)
  _h < 10 ? (_h = '0' + _h) : _h = String(_h)
  _m < 10 ? (_m = '0' + _m) : _m = String(_m)
  _s < 10 ? (_s = '0' + _s) : _s = String(_s)
  return {
    tiem: _d + (symbols || '天') + _h + (symbols || '时') + _m + (symbols || '分') + _s + (symbols ? '' : '秒'),
    tiems: { d: _d, h: _h, m: _m, s: _s }
  }
}
/**
 * 某个时间距离当前时间转换
 * @param { String } time 时间（'2008-08-08'、'2008/08/08'）
 */
const distanceTime = (time) => {
  time = time.replace(/-/g, '/')
  let _str
  let _date = new Date().getTime()
  let _curDate = new Date(time).getTime()
  let _differDate = _date - _curDate
  let _min = parseInt(_differDate / 60000) > 0 ? parseInt(_differDate / 60000) : 1
  let _hour = parseInt(_min / 60)
  let _day = parseInt(_hour / 24)
  let _mon = parseInt(_day / 30)
  if (_min < 60) {
    _str = { ch: _min + "分钟前", en: _min + ' minutes ago' }
  } else if (_hour < 24) {
    _str = { ch: _hour + "小时前", en: _hour + ' hours ago' }
  } else if (_day < 30) {
    _str = { ch: _day + "天前", en: _day + ' days ago' }
  } else if (_mon < 12) {
    _str = { ch: _mon + "月前", en: _mon + ' months ago' }
  }
  return _str
}
/**
 * 个位数自动在前面添加0
 * @param { Number } n 数字
 */
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 保留固定小数不足添0
 * @param { Number } x 数字
 * @param { Number } n 保留固定小数位数
 * @param { Number } math 保留方式（none、round、floor）
 */
const decimal_place = (x, n = 2, math = 'round') => {
  let f_x = parseFloat(x);
  if (isNaN(f_x)) {
    return 0;
  }
  let _n = '1';
  for (let i = 0; i < n; i++) {
    _n += '0'
  }
  _n = Number(_n)
  if (math == 'none') {
    f_x = parseInt(x * _n) / _n
  } else if (math == 'round') {
    f_x = Math.round(x * _n) / _n
  } else if (math == 'floor') {
    f_x = Math.floor(x * _n) / _n
  }
  let s_x = f_x.toString()
  let pos_decimal = s_x.indexOf('.')
  　if (pos_decimal < 0) {
    pos_decimal = s_x.length
    s_x += '.'
  }
  while (s_x.length <= pos_decimal + n) {
    s_x += '0'
  }
  return s_x
}
/**
 * 两个数组之间的交集、差集、补集、并集
 * @param { Array } arr1 数组1
 * @param { Array } arr2 数组2
 */
const getArrGather = (arr1, arr2) => {
  let sa = new Set(arr1), sb = new Set(arr2)
  let intersect = arr1.filter(x => sb.has(x))// 交集
  let minus = arr1.filter(x => !sb.has(x))// 差集
  let complement = [...arr1.filter(x => !sb.has(x)), ...arr2.filter(x => !sa.has(x))]// 补集
  let unionSet = Array.from(new Set([...arr1, ...arr2]))// 并集
  return { intersect, minus, complement, unionSet }
}
/**
 * 生成随机字符串
 * @param { Number } len 随机字符串的长度
 */
const randomString = len => {
　len = len || 32
　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'  /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
　var maxPos = $chars.length
　var pwd = ''
　for (let i = 0; i < len; i++) {
　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
　}
　return pwd
}
/**
 * 生成随机数
 * @param { Number } min 随机数下限
 * @param { Number } max 随机数上限
 */
const getRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
/**
 * 摇一摇1
 * @param { Boolean } isOpen 开关
 * @param { Number } shakeNum 摇的指定次数
 * @param { Number } interval 频率
 * @param { String } audio 音频文件
 * @param { Function } callBack 回调函数
 */
const shake_one_shake = (isOpen, shakeNum = 2, interval = 2000, audio, callBack) => { // 摇一摇方法封装
  let numX = 0 //x轴
  let numY = 0 // y轴
  let numZ = 0 // z轴
  let stsw = true // 开关，保证在一定的时间内只能是一次摇成功
  let positivenum = 0 //正数 摇一摇总数
  let audioCtx//音频，用于摇成功提示
  if (!isOpen) {
    wx.stopAccelerometer()
    callBack('已经关闭摇一摇')
    return;
  }
  wx.startAccelerometer({
    interval: 'ui'
  })
  wx.onAccelerometerChange(function (res) {  //小程序api 加速度计
    if (numX < res.x && numY < res.y) {  //个人看法，一次正数算摇一次，还有更复杂的
      positivenum++
      setTimeout(() => { positivenum = 0 }, interval) //计时两秒内没有摇到指定次数，重新计算
    }
    if (numZ < res.z && numY < res.y) { //可以上下摇，上面的是左右摇
      positivenum++
      setTimeout(() => { positivenum = 0 }, interval) //计时两秒内没有摇到指定次数，重新计算
    }
    if (positivenum == shakeNum && stsw) { //是否摇了指定的次数，执行成功后的操作
      stsw = false
      if (audio) {
        let audioCtx = wx.createAudioContext(audio.split(",")[0])
        audioCtx.setSrc(audio.split(",")[1]) //音频文件，第三方的可自行选择
        audioCtx.play() //播发音频
      }
      callBack('摇一摇成功...')
      setTimeout(() => {
        positivenum = 0 // 摇一摇总数，重新0开始，计算
        stsw = true
      }, shakeSpeed)
    }
  })
}
/**
 * 摇一摇2
 * @param { Boolean } isOpen 开关
 * @param { Number } shakeSpeed 摇的幅度阈值
 * @param { Number } interval 频率
 * @param { String } audio 音频文件
 * @param { Function } callBack 回调函数 
 */
const shake_one_shake2 = (isOpen, shakeSpeed = 100, interval = 2000, audio, callBack) => {
  //首先定义一下，全局变量
  let lastTime = 0; //此变量用来记录上次摇动的时间
  let x = 0,
    y = 0,
    z = 0,
    lastX = 0,
    lastY = 0,
    lastZ = 0; //此组变量分别记录对应x、y、z三轴的数值和上次的数值
  let stsw = true // 开关，保证在一定的时间内只能是一次摇成功
  if (!isOpen) {
    wx.stopAccelerometer()
    callBack({ status: 0})
    return;
  }
  wx.onAccelerometerChange(shake)
  //wx.startAccelerometer()
  //编写摇一摇方法
  function shake(acceleration) {
    let nowTime = new Date().getTime(); //记录当前时间
    //如果这次摇的时间距离上次摇的时间有一定间隔 才执行
    if (nowTime - lastTime > 100) {
      let diffTime = nowTime - lastTime; //记录时间段
      lastTime = nowTime; //记录本次摇动时间，为下次计算摇动时间做准备
      x = acceleration.x; //获取x轴数值，x轴为垂直于北轴，向东为正
      y = acceleration.y; //获取y轴数值，y轴向正北为正
      z = acceleration.z; //获取z轴数值，z轴垂直于地面，向上为正
      //计算 公式的意思是 单位时间内运动的路程，即为我们想要的速度
      let speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 10000;
      //console.log(speed)
      lastX = x; //赋值，为下一次计算做准备
      lastY = y; //赋值，为下一次计算做准备
      lastZ = z; //赋值，为下一次计算做准备
      if (speed > shakeSpeed && stsw) { //如果计算出来的速度超过了阈值，那么就算作用户成功摇一摇
        stsw = false
        if (audio) {
          let audioCtx = wx.createAudioContext(audio.split(",")[0])
          audioCtx.setSrc(audio.split(",")[1]) //音频文件，第三方的可自行选择
          audioCtx.play() //播发音频
        }
        callBack({ status: 1 })
        setTimeout(() => {
          stsw = true
        }, interval)
      }
    }
  }
}
/**
 * 简易表单验证
 * @param { Object } opation 表单数据
 * @param { Array } sensitiveWords 提示文案
 * @param { String } lang 语言（'CH'、'EN'）
 */
const regexp = (opation, sensitiveWords, lang) => {
  return new Promise((resolve, reject) => {
    let reg_tel = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;//正则--手机号
    let reg_chs = /^[\u4E00-\u9FA0]{2,6}$/;//正则--中文
    let sensitivewords = []
    for (let i = 0; i < sensitiveWords.length; i++) {
      if (lang == 'CH') {
        sensitivewords.push(sensitiveWords[i].sensitive_name)
      } else {
        sensitivewords.push(sensitiveWords[i].sensitive_name_english)
      }
    }
    for (let k in opation) {
      if (!(opation[k].value).replace(/\s+/g, "")) {
        resolve({ status: 1, prompt: opation[k].prompt[0] })
      }
      if (opation[k].reg) {
        if (opation[k].reg.indexOf('minLength') != -1) {
          if (opation[k].value.length < opation[k].reg.split("-")[1]) {
            resolve({ status: 1, prompt: opation[k].prompt[4] })
          }
        }
      }
      if (opation[k].type === 'tel') {
        if (!reg_tel.test(opation[k].value)) {
          resolve({ status: 1, prompt: opation[k].prompt[1] })
        }
      }
      for (let i = 0; i < sensitivewords.length; i++) {
        if (opation[k].value.indexOf(sensitivewords[i]) != -1) {
          resolve({ status: 1, prompt: opation[k].prompt[1] + opation[k].prompt[2] + sensitivewords[i] + opation[k].prompt[3] })
        }
      }
    }
    resolve({ status: 0 })
  })
}
/**
 * js浮点数精度--两数相加
 * @param {Number} num1 数字1
 * @param {Number} num2 数字2
 */
const accAdd = (num1, num2) => {
  let r1, r2, m
  try {
    r1 = num1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = num2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return Math.round(num1 * m + num2 * m) / m
}
/**
 * js浮点数精度--两数相减
 * @param {Number} num1 数字1
 * @param {Number} num2 数字2
 */
const accSub = (num1, num2) => {
  let r1, r2, m, n
  try {
    r1 = num1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = num2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  n = (r1 >= r2) ? r1 : r2
  return (Math.round(num1 * m - num2 * m) / m).toFixed(n)
}
/**
 * js浮点数精度--两数相乘
 * @param {Number} num1 数字1
 * @param {Number} num2 数字2
 */
const accMul = (num1, num2) => {
  let m = 0, s1 = num1.toString(), s2 = num2.toString()
  try { m += s1.split(".")[1].length } catch (e) { }
  try { m += s2.split(".")[1].length } catch (e) { }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
/**
 * js浮点数精度--两数相除
 * @param {Number} num1 数字1
 * @param {Number} num2 数字2
 */
const accDiv = (num1, num2) => {
  let t1, t2, r1, r2
  try {
    t1 = num1.toString().split('.')[1].length
  } catch (e) {
    t1 = 0
  }
  try {
    t2 = num2.toString().split(".")[1].length
  } catch (e) {
    t2 = 0
  }
  r1 = Number(num1.toString().replace(".", ""))
  r2 = Number(num2.toString().replace(".", ""))
  return (r1 / r2) * Math.pow(10, t2 - t1)
}
/**
 * wxPromisify
 * @param { Function } fn 待Promise的函数
 */
const wxPromisify = fn => {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }
      obj.fail = function (res) {
        reject(res)
      }
      fn(obj)
    })
  }
}
/**
 * rgb转16进制
 * @param { String } rgb 
 */
const colorHex = rgb => {
  if (rgb.charAt(0) == '#') return rgb;
  var ds = rgb.split(/\D+/), decimal = Number(ds[1]) * 65536 + Number(ds[2]) * 256 + Number(ds[3])
  return "#" + zero_fill_hex(decimal, 6)
  function zero_fill_hex (num, digits) {
    var s = num.toString(16);
    while (s.length < digits)
      s = "0" + s;
    return s;
  }
}
/**
 * 16进制转rgb
 * @param { String } color 
 */
const colorRgb = (color) => {
  // 16进制颜色值的正则
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 把颜色值变成小写
  color = color.toLowerCase()
  if (reg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
      var colorNew = "#"
      for (var i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1))
      }
      color = colorNew
    }
    // 处理六位的颜色值，转为RGB
    var colorChange = []
    for (var i = 1; i < 7; i += 2) {
      colorChange.push(parseInt("0x" + color.slice(i, i + 2)))
    }
    return "rgb(" + colorChange.join(",") + ")"
  } else {
    return color
  }
}
/**
 * rgb转hsv
 * @param { String } color 
 */
const rgbaToHsv = (color) => {
  var arr = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",")
  var h = 0, s = 0, v = 0;
  var r = arr[0], g = arr[1], b = arr[2];
  arr.sort(function (a, b) {
      return a - b;
  })
  var max = arr[2]
  var min = arr[0];
  v = max / 255;
  if (max === 0) {
      s = 0;
  } else {
      s = 1 - (min / max);
  }
  if (max === min) {
      h = 0;//事实上，max===min的时候，h无论为多少都无所谓
  } else if (max === r && g >= b) {
      h = 60 * ((g - b) / (max - min)) + 0;
  } else if (max === r && g < b) {
      h = 60 * ((g - b) / (max - min)) + 360
  } else if (max === g) {
      h = 60 * ((b - r) / (max - min)) + 120
  } else if (max === b) {
      h = 60 * ((r - g) / (max - min)) + 240
  }
  h = parseInt(h);
  s = parseFloat(s.toFixed(4))
  v = parseFloat(v.toFixed(4))
  return [h, s, v]
}
module.exports = {
  getQueryString,//解析链接中的参数
  distanceTime,//某个时间距离当前时间转换
  getDate,//获取当前时间
  getDistance,//获取距离日期
  timestampToTime,//时间戳转换时间
  minutesAndSeconds,//倒计时
  decimal_place,//保留固定小数不足添0
  getArrGather,//两个数组之间的交集、差集、补集、并集
  randomString,//生成随机字符串
  getRandomNum,//生成随机数
  shake_one_shake,//摇一摇
  shake_one_shake2,//摇一摇2
  regexp: regexp,//表单验证
  accAdd,//js浮点数精度--加
  accSub,//js浮点数精度--减
  accMul,//js浮点数精度--乘
  accDiv,//js浮点数精度--除
  wxPromisify,//promisify
  colorHex,//RGB转换为16进制
  colorRgb,//16进制转换为RGB
  rgbaToHsv//rba进度车hs
}