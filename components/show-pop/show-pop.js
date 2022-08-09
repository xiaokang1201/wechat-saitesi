// components/show-pop/show-pop.js
Component({
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
    }
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
    // 事件1
    event1() {
      this.triggerEvent('event1')
    },
    // 事件2
    event2() {
      this.triggerEvent('event2')
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
