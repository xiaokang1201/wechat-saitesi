// components/custom-nav-bar/custom-nav-bar.ts
interface data {
  custom: Object,//胶囊信息
  statusBar: Number,//状态栏
  customBar: Number,//导航栏高度
}
Component({
  options: {
    multipleSlots: true,//多插槽
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 自定义样式
    customStyle: {
      type: String,
      value: ""
    },
    // 背景色
    background: {
      type: String,
      value: "#ffffff"
    },
    // 文字颜色
    color: {
      type: String,
      value: "#0f0f0f"
    },
    // 背景图片
    bgImage: {
      type: String
    },
    // 标题
    content: {
      type: String
    },
    // 返回图片/图标
    backImage: {
      type: String,
      value: "",
    },
    // 返回文案
    backText: {
      type: String
    },
    // 高度是否占位
    placeholder: {
      type: Boolean,
      value: true
    },
    // copy胶囊位置是否显示
    capsule: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {} as data,

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取胶囊信息
    getSystemInfo() {
      wx.getSystemInfo({
        success: e => {
          this.setData({
            statusBar: e.statusBarHeight
          })
          let capsule = wx.getMenuButtonBoundingClientRect();
          if (capsule) {
            this.setData({
              custom: capsule,
              customBar: capsule.bottom + capsule.top - e.statusBarHeight
            })
          } else {
            this.setData({
              customBar: e.statusBarHeight + 50,
            })
          }
        }
      })
    },
    // 返回
    goBack() {
      wx.navigateBack({
        delta: 1,
      })
    }
  },
  lifetimes: {
    attached() {
      this.getSystemInfo()
    }
  }
})

