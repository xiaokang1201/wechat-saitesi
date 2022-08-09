// components/custom-tab-bar/custom-tab-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 当前显示路径
    pagePath: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    "color": "#68686F",
    "selectedColor": "#0B357A",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "assets/images/tab-bar/0.png",
        "selectedIconPath": "assets/images/tab-bar/1.png"
      },
      {
        "pagePath": "pages/mall/mall",
        "text": "商城",
        "iconPath": "assets/images/tab-bar/2.png",
        "selectedIconPath": "assets/images/tab-bar/3.png"
      },
      {
        "pagePath": "pages/cart/cart",
        "text": "购物车",
        "iconPath": "assets/images/tab-bar/4.png",
        "selectedIconPath": "assets/images/tab-bar/5.png"
      },
      {
        "pagePath": "pages/my/my",
        "text": "我的",
        "iconPath": "assets/images/tab-bar/6.png",
        "selectedIconPath": "assets/images/tab-bar/7.png"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // tabBar跳转
    switchTab({ currentTarget: { dataset: { path } } }) {
      wx.switchTab({
        url: path,
      })
    },
  }
})
