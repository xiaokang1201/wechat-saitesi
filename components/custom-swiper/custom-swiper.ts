// components/custom-swiper/custom-swiper.ts
import useJump from "../../hook/use-jump"

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    swiperList: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    swiperIndex: 0,//轮播图索引
    currentIndex: 0,//切换索引
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击轮播图项
    swiperItemClick({ currentTarget: { dataset: { item: { type, url } } } }: CurrentTarget<{ type: number, url: string }>) {
      useJump(type, url)
    },
    
    // 轮播触发
    swiperChange({ detail: { current } }: swiperChange) {
      this.data.swiperIndex = current
      this.setData({
        currentIndex: current
      })
    },

    // 点击右箭头
    arrowRightClick() {
      const swiperIndex = this.data.swiperIndex + 1
      this.setData({ swiperIndex: swiperIndex <= this.data.swiperList.length - 1 ? swiperIndex : 0 })
    },
  }
})
