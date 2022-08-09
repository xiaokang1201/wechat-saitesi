// components/swipe-action/swipe-action.js
let startX, startY;
Component({
  options: {
    multipleSlots: true,//多插槽
    styleIsolation: "apply-shared"
  },
  
  /**
   * 组件的属性列表
   */
  properties: {
    translateX: { 
      type: Number,
      value: '84rpx'
    },
    isTouchMove: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //开始触摸
    touchstart(e) {
      startX = e.changedTouches[0].clientX
      startY = e.changedTouches[0].clientY
    },
    touchmove(e) {
      const touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = this.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      this.setData({ isTouchMove: touchMoveX <= startX })
      // if (touchMoveX > startX) {//右滑
      //   console.log("右滑")
      // } else {//左滑
      //   console.log("左滑")
      // }
    },
    angle(start, end) {
      const _X = end.X - start.X,
      _Y = end.Y - start.Y
      //返回角度 /Math.atan()返回数字的反正切值
      return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
    }
  },
  lifetimes: {
    attached() {
    }
  }
})
