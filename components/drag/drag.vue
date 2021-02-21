<template>
  <div class="x-drag" :class="classMain" ref="main">
    <slot></slot>
  </div>
</template>
<script>
import utils from '../utils/utils.js'
export default {
  name: 'x-drag',
  props: {
    orderKey: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    return {
      direction: 'free',
      parentSize: null
    }
  },
  watch: {
  },
  computed: {
    classMain () {
      return {
        [this.$style.main]: true,
        [this.$style.c_noselect]: true
      }
    },
    dragGroup () {
      return utils.getParentByComponentName(this.$parent, 'x-drag-group')
    }
  },
  beforeCreate () {
  },
  created () {
    this.direction = this.dragGroup.open_getDirection()
  },
  mounted () {
    this.$refs.main.setAttribute('order-key', this.orderKey)
    this.getBarDom()
  },
  updated () {
  },
  methods: {
    getBarDom () {
      utils.dom.on(utils.dom.getChildByAttribute(this.$el, 'dragbar'), 'mousedown', this.handleMousedown)
    },
    handleMousedown (e) {
      this.isMousedown = true
      // this.offsetY = e.offsetY
      // this.offsetX = e.offsetX
      // console.log(e);
      this.pageY = e.pageY
      this.pageX = e.pageX
      this.mainTop = this.$refs.main.offsetTop
      this.mainLeft = this.$refs.main.offsetLeft
      this.cloneNode = this.$refs.main.cloneNode(true)
      this.cloneNode.style.margin = '0px'
      this.cloneNode.style.position = 'absolute'
      this.cloneNode.style.top = this.mainTop + 'px'
      this.cloneNode.style.left = this.mainLeft + 'px'
      this.cloneNode.style.width = this.$refs.main.offsetWidth + 'px'
      this.cloneNode.style.height = this.$refs.main.offsetHeight + 'px'
      this.allChildLocationInfo = this.$parent.open_getAllChildLocationInfo()
      this.$parent.$el.appendChild(this.cloneNode)
      utils.dom.on(document, 'mousemove', this.handleMousemove)
      this.$refs.main.style.visibility = 'hidden'
      this.moveIndex = this.$parent.getIndex(this.$el)
      this.replaceIndex = this.$parent.getIndex(this.$el)
      utils.dom.on(document, 'mouseup', this.handleMouseup)
      this.parentSize = this.$parent.open_getSize()
    },
    handleMouseup () {
      if (this.isMousemove) {
        this.$parent.$el.removeChild(this.cloneNode)
        this.$refs.main.style.visibility = ''
      }
      if (this.moveIndex !== this.replaceIndex) {
        this.$parent.orderChange()
      }
      this.isMousedown = false
      utils.dom.remove(document, 'mousemove', this.handleMousemove)
      utils.dom.remove(document, 'mouseup', this.handleMouseup)
    },
    handleMousemove (e) {
      if (this.isMousedown) {
        this.isMousemove = true
        let top = this.mainTop - (this.pageY - e.pageY)
        let left = this.mainLeft - (this.pageX - e.pageX)
        const offsetWidth = this.cloneNode.offsetWidth
        const offsetHeight = this.cloneNode.offsetHeight
        if (top < 0) {
          top = 0
        } else if (top > (this.parentSize.height - offsetHeight)) {
          top = this.parentSize.height - offsetHeight
        }
        if (left < 0) {
          left = 0
        } else if (left > (this.parentSize.width - offsetWidth)) {
          left = this.parentSize.width - offsetWidth
        }
        if (this.direction === 'free') {
          this.cloneNode.style.top = top + 'px'
          this.cloneNode.style.left = left + 'px'
        } else if (this.direction === 'vertical') {
          this.cloneNode.style.top = top + 'px'
        } else if (this.direction === 'horizontal') {
          this.cloneNode.style.left = left + 'px'
        }
        const rightBoundary = left + offsetWidth // 右边界
        const leftBoundary = left // 左边界
        const topBoundary = top // 上边界
        const bottomBoundary = top + offsetHeight // 下边界
        // let intersectionList = []
        let replaceIndex = this.replaceIndex
        let area = 0
        for (let i = 0; i < this.allChildLocationInfo.length; i++) {
          const rightBoundaryNowOne = this.allChildLocationInfo[i].offsetLeft + this.allChildLocationInfo[i].offsetWidth // 右边界
          const leftBoundaryNowOne = this.allChildLocationInfo[i].offsetLeft // 左边界
          const topBoundaryNowOne = this.allChildLocationInfo[i].offsetTop // 上边界
          const bottomBoundaryNowOne = this.allChildLocationInfo[i].offsetTop + this.allChildLocationInfo[i].offsetHeight// 下边界
          if (rightBoundary > leftBoundaryNowOne &&
              leftBoundary < rightBoundaryNowOne &&
              bottomBoundary > topBoundaryNowOne &&
              topBoundary < bottomBoundaryNowOne) {
            let width = 0
            if (rightBoundary < rightBoundaryNowOne) {
              width = rightBoundary - leftBoundaryNowOne
            } else {
              width = rightBoundaryNowOne - leftBoundary
            }
            let height = 0
            if (bottomBoundary < bottomBoundaryNowOne) {
              height = bottomBoundary - topBoundaryNowOne
            } else {
              height = bottomBoundaryNowOne - topBoundary
            }
            if (width * height > area) {
              area = width * height
              replaceIndex = i
            }
          }
        }
        if (this.replaceIndex !== replaceIndex) {
          if (this.moveIndex <= replaceIndex) {
            if (replaceIndex + 1 < this.allChildLocationInfo.length) {
              this.$parent.$el.insertBefore(this.$refs.main, this.allChildLocationInfo[replaceIndex + 1].el)
            } else {
              this.$parent.$el.appendChild(this.$refs.main)
            }
          } else {
            if (replaceIndex < this.allChildLocationInfo.length - 1) {
              this.$parent.$el.insertBefore(this.$refs.main, this.allChildLocationInfo[replaceIndex].el)
            } else {
              this.$parent.$el.appendChild(this.$refs.main)
            }
          }
          this.replaceIndex = replaceIndex
        }
      }
    }
  },
  components: {
  }
}
</script>

<style module lang="scss">
</style>
