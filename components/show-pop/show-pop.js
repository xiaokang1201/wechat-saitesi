// components/show-pop/show-pop.js
import wxOpenLocation from "../../private/wx-open-location"
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 弹框类型
    type: {
      type: Number,
      value: 0
    },
    // 开关动画 
    show: {
      type: Boolean,
      value: false,
      // 关闭弹框  动画结束后关闭
      observer(v) {
        if(v) {
          this.setData({
            vShow: v
          })
        }else {
          setTimeout(() => {
            this.setData({
              vShow: v
            })
            // 定时器时间关联动画过渡时间
          },500)
        }
      }
    },
    // 弹出位置
    position:{
      type: String,
      value: 'center',
    },
    // 内容Y轴位置调整
    axisY: {
      type: String
    },
    // 遮罩层样式 默认设置背景黑色
    overlayStyle: {
      type: String,
      value: "background-color:rgba(0, 0, 0, 0.7);"
    },
    // 遮罩层层级
    zIndex: {
      type: Number,
      value: 100
    },
    qrcode: String
  },
  /**
   * 组件的初始数据
   */
  data: {
    vShow: false, //关闭弹框 动画结束后 500ms 关闭 确保 使用 hidden 而非 wx:if 判断 动画执行 / 确保首次关闭弹框
  },

  /**
   * 组件的方法列表
   */
  methods: {
    navigation() {
      wxOpenLocation()
    },
    inputchange({ detail: { value } }) {
      this.data.reason = value
    },
    // 事件1
    event1() {
      this.triggerEvent('event1', this.data.reason)
    },
    // 事件2
    event2() {
      this.triggerEvent('event2')
    },
    // 点击下载图片事件
    downloadImg() {
      wx.showLoading({ title: '加载中...' });
      wx.downloadFile({
        url: this.data.$state.userConfig.custom_qrcode, //图片地址
        success(res) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath, //图片文件路径
            success() {
              wx.hideLoading(); //隐藏 loading 提示框
              wx.showModal({
                  title: '提示',
                  content: '保存成功',
                  modalType: false,
              })
            },
            // 接口调用失败的回调函数
            fail(err) {
              if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
                wx.showModal({
                  title: '提示',
                  content: '需要您授权保存相册',
                  modalType: false,
                  success() {
                    wx.openSetting({
                      success(settingdata) {
                        if (settingdata.authSetting['scope.writePhotosAlbum']) {
                          wx.showModal({
                            title: '提示',
                            content: '获取权限成功,再次点击图片即可保存',
                            modalType: false,
                          })
                        } else {
                          wx.showModal({
                            title: '提示',
                            content: '获取权限失败，将无法保存到相册哦~',
                            modalType: false,
                          })
                        }
                      }
                    })
                  }
                })
              }
            },
            complete() {
              wx.hideLoading(); //隐藏 loading 提示框
            }
          })
        }
      })
    },
    // 点击遮罩层
    clickoverlay() {
      this.triggerEvent('clickoverlay')
    },
    // 空函数
    empty() {
      return
    },
  }
})
