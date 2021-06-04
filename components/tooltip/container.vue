<template>
  <div v-show="visibility" ref="main" :style="styleMain" :class="$style.main">
    <div :class="classContent" ref="content">
      <div :class="$style.arrow" :style="styleArrow">
        <!-- <div :class="$style.overlap" :style="styleOverlap"></div> -->
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import utils from '../utils/utils.js'
import scssVariable from '../assets/css/variableJs.scss'
export default {
  name: 'x-tip1',
  props: {
    placement: {
      type: String,
      default: 'bottom'
    },
    interaction: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'default'
    }
  },
  data () {
    return {
      isAppend: false,
      styleOverlap: {},
      styleArrow: {},
      styleMain: {},
      zIndex: utils.zIndex.nextZIndex(),
      visibility: false,
      firstShow: true,
      referenceDom: null,
      parentContainer: null
    }
  },
  created () {
  },
  mounted () {
    utils.dom.on(this.$el, 'mouseleave', this.handlerLeave)
  },
  watch: {
    visibility: function (val) {
      if (val) {
        this.$set(this.styleMain, 'zIndex', utils.zIndex.nextZIndex())
        if (this.firstShow) { // 第一次显示
          this.firstShow = false
          this.$nextTick(() => {
            this.isAppend = true
            this.parentContainer = utils.dom.getParentByAttribute(this.referenceDom, 'tooltip-container')
            if (this.parentContainer) { // 相对于有tooltip-container属性的父级定位
              this.parentContainer.appendChild(this.$el)
            } else { // 相对于根节点定位
              document.body.appendChild(this.$el)
            }
            this.setLocation()
          })
        } else {
          this.$nextTick(() => {
            this.setLocation()
          })
        }
      }
    }
  },
  computed: {
    placementDirection () { // 方向
      if (this.placement && this.placement.split('-').length > 0) {
        return this.placement.split('-')[0]
      }
      return 'bottom'
    },
    placementAlign () { // 对齐方式
      if (this.placement && this.placement.split('-').length > 1) {
        return this.placement.split('-')[1]
      }
      return 'center'
    },
    classContent () {
      return {
        [this.$style.content]: true,
        [this.$style.default]: this.type === 'default',
        [this.$style.success]: this.type === 'success',
        [this.$style.error]: this.type === 'error',
        [this.$style.warning]: this.type === 'warning',
        [this.$style.white]: this.type === 'white'
      }
    },
    borderLeftColor () {
      if (this.type === 'default') {
        return scssVariable.colorTextRegular
      } else if (this.type === 'success') {
        return scssVariable.colorSuccess
      } else if (this.type === 'error') {
        return scssVariable.colorDanger
      } else if (this.type === 'warning') {
        return scssVariable.colorWarning
      } else if (this.type === 'white') {
        return scssVariable.colorWhite
      }
      return scssVariable.colorTextRegular
    }
  },
  methods: {
    handlerLeave () {
      this.interaction && this.open_setVisibility(false)
    },
    open_setVisibility (visibility) {
      this.visibility = visibility
    },
    open_setReferenceDom (referenceDom) { // 设置参照物
      this.referenceDom = referenceDom
    },
    open_reset () {
      this.visibility && this.setLocation()
    },
    setDirection (referenceDomSizeInfo, direction) { // 设置方向
      if (direction === 'top') {
        this.$set(this.styleArrow, 'borderColor', `transparent ${this.borderLeftColor} ${this.borderLeftColor} transparent`)
        this.$set(this.styleArrow, 'boxShadow', '3px 3px 5px rgba(0, 0, 0, 0.05)')
        this.$set(this.styleArrow, 'bottom', '9px')
        this.$set(this.styleMain, 'paddingBottom', '12px')
        referenceDomSizeInfo && this.$set(this.styleMain, 'bottom', referenceDomSizeInfo.bottom + 'px')
      } else if (direction === 'bottom') {
        this.$set(this.styleArrow, 'borderColor', `${this.borderLeftColor} transparent transparent ${this.borderLeftColor}`)
        this.$set(this.styleArrow, 'boxShadow', '-3px -3px 5px rgba(0, 0, 0, 0.05)')
        this.$set(this.styleArrow, 'top', '9px')
        this.$set(this.styleMain, 'paddingTop', '12px')
        referenceDomSizeInfo && this.$set(this.styleMain, 'top', referenceDomSizeInfo.top + referenceDomSizeInfo.height + 'px')
      } else if (direction === 'left') {
        this.$set(this.styleArrow, 'borderColor', `${this.borderLeftColor} ${this.borderLeftColor} transparent transparent `)
        this.$set(this.styleArrow, 'boxShadow', '3px -3px 5px rgba(0, 0, 0, 0.05)')
        this.$set(this.styleArrow, 'right', '9px')
        this.$set(this.styleMain, 'paddingRight', '12px')
        referenceDomSizeInfo && this.$set(this.styleMain, 'right', referenceDomSizeInfo.right + 'px')
      } else if (direction === 'right') {
        this.$set(this.styleArrow, 'borderColor', `transparent transparent ${this.borderLeftColor} ${this.borderLeftColor}`)
        this.$set(this.styleArrow, 'boxShadow', '-3px 3px 5px rgba(0, 0, 0, 0.05)')
        this.$set(this.styleArrow, 'left', '9px')
        this.$set(this.styleMain, 'paddingLeft', '12px')
        referenceDomSizeInfo && this.$set(this.styleMain, 'left', referenceDomSizeInfo.left + referenceDomSizeInfo.width + 'px')
      }
    },
    setAlign (referenceDomSizeInfo, align, direction) {
      if (this.parentContainer) { // 相对于有tooltip-container 属性的父级定位
        referenceDomSizeInfo = utils.dom.getLocationRelativeParent(this.referenceDom, this.parentContainer)
      } else { // 相对于根节点定位
        referenceDomSizeInfo = utils.dom.getLocationRelativeWindow(this.referenceDom)
      }
      var width = this.$el.offsetWidth
      var height = this.$el.offsetHeight
      if (direction === 'top' || direction === 'bottom') {
        let leftOrRight = 0
        if (width >= referenceDomSizeInfo.width) {
          leftOrRight = referenceDomSizeInfo.width / 2
        } else {
          leftOrRight = width / 2
        }
        leftOrRight -= 6
        if (leftOrRight < 3) {
          leftOrRight = 3
        }
        if (align === 'start') {
          this.$set(this.styleMain, 'left', referenceDomSizeInfo.left + 'px')
          this.$set(this.styleArrow, 'left', leftOrRight + 'px')
        } else if (align === 'end') {
          this.$set(this.styleMain, 'right', referenceDomSizeInfo.right - referenceDomSizeInfo.width + 'px')
          this.$set(this.styleArrow, 'right', leftOrRight + 'px')
        } else if (align === 'center') {
          this.$set(this.styleMain, 'left', referenceDomSizeInfo.left - (width - referenceDomSizeInfo.width) / 2 + 'px')
          this.$set(this.styleArrow, 'left', width / 2 - 4 + 'px')
        }
        this.$set(this.styleOverlap, 'marginLeft', '-5px')
        this.$delete(this.styleOverlap, 'marginTop')
      } else {
        let topOrBottom = 0
        if (height >= referenceDomSizeInfo.height) {
          topOrBottom = referenceDomSizeInfo.height / 2
        } else {
          topOrBottom = height / 2
        }
        topOrBottom -= 6
        if (topOrBottom < 3) {
          topOrBottom = 3
        }
        if (align === 'start') {
          this.$set(this.styleMain, 'top', referenceDomSizeInfo.top + 'px')
          this.$set(this.styleArrow, 'top', topOrBottom + 'px')
        } else if (align === 'end') {
          this.$set(this.styleMain, 'bottom', referenceDomSizeInfo.bottom - referenceDomSizeInfo.height + 'px')
          this.$set(this.styleArrow, 'bottom', topOrBottom + 'px')
        } else if (align === 'center') {
          this.$set(this.styleMain, 'top', referenceDomSizeInfo.top - (height - referenceDomSizeInfo.height) / 2 + 'px')
          this.$set(this.styleArrow, 'top', height / 2 - 6 + 'px')
        }
        this.$set(this.styleOverlap, 'marginTop', '-5px')
        this.$delete(this.styleOverlap, 'marginLeft')
      }
    },
    emptyStyle () {
      for (let key in this.styleOverlap) {
        this.$delete(this.styleOverlap, key)
      }
      for (let key in this.styleArrow) {
        this.$delete(this.styleArrow, key)
      }
      for (let key in this.styleMain) {
        this.$delete(this.styleMain, key)
      }
    },
    // determinePlacement (sizes) { // 暂时不用，根据内容是否被挤压选择出最合适的方向
    //   var best = null
    //   for (let i = 0; i < sizes.length; i++) {
    //     if (sizes[i].placement === (this.placementDirection + '-' + this.placementAlign)) {
    //       best = sizes[i]
    //       break
    //     }
    //   }
    //   var bestBest = false
    //   for (let i = 0; i < sizes.length; i++) {
    //     if (best.width < sizes[i].width) {
    //       console.log('存在更好的位置')
    //       bestBest = true
    //       break
    //     }
    //   }
    //   console.log(bestBest, sizes)
    // },
    supposeSetLocation (referenceDomSizeInfo) { // 暂时不用
      var directions = ['bottom', 'top', 'right', 'top']
      var sizes = []
      this.supposeSetLocationRecursion(sizes, referenceDomSizeInfo, directions, 0)
    },
    supposeSetLocationRecursion (sizes, referenceDomSizeInfo, directions, index) { // 暂时不用
      this.emptyStyle()
      this.setDirection(referenceDomSizeInfo, directions[index])
      this.$nextTick(() => {
        this.supposeSetAlign(sizes, referenceDomSizeInfo, directions, index)
      })
    },
    supposeSetAlign (sizes, referenceDomSizeInfo, directions, index) { // 暂时不用
      var aligns = ['center', 'start', 'center']
      this.supposeSetAlignRecursion(sizes, referenceDomSizeInfo, aligns, 0, directions, index)
    },
    supposeSetAlignRecursion (sizes, referenceDomSizeInfo, aligns, index, directions, indexDirections) { // 暂时不用
      this.emptyStyle()
      this.setDirection(referenceDomSizeInfo, directions[indexDirections])
      this.setAlign(referenceDomSizeInfo, aligns[index], directions[indexDirections])
      this.$nextTick(() => {
        sizes.push({
          placement: directions[indexDirections] + '-' + aligns[index],
          width: this.$refs.content.offsetWidth,
          height: this.$refs.content.offsetHeight
        })
        if (aligns.length > index + 1) {
          this.supposeSetAlignRecursion(sizes, referenceDomSizeInfo, aligns, index + 1, directions, indexDirections)
        } else if (directions.length > indexDirections + 1) {
          this.supposeSetLocationRecursion(sizes, referenceDomSizeInfo, directions, indexDirections + 1)
        } else {
          this.determinePlacement(sizes)
        }
      })
    },
    setLocation () {
      var referenceDomSizeInfo = null
      if (this.parentContainer) { // 相对于有drop-down-container属性的父级定位
        referenceDomSizeInfo = utils.dom.getLocationRelativeParent(this.referenceDom, this.parentContainer)
      } else { // 相对于根节点定位
        referenceDomSizeInfo = utils.dom.getLocationRelativeWindow(this.referenceDom)
      }
      this.setDirection(referenceDomSizeInfo, this.placementDirection)
      this.$nextTick(() => {
        this.setAlign(referenceDomSizeInfo, this.placementAlign, this.placementDirection)
      })
    }
  },
  beforeDestroy () {
    this.referenceDom = null
    if (this.isAppend) {
      if (this.parentContainer) {
        this.parentContainer.removeChild(this.$el)
      } else {
        document.body.removeChild(this.$el)
      }
    }
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  position: absolute;
  box-sizing: border-box;
  .content{
    color: $color-white;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 8px;
    box-sizing: border-box;
    font-size: 12px;
    line-height: 1.2;
    min-width: 10px;
    word-wrap: break-word;
    box-shadow: 0px 0px 7px rgba(0,0,0,0.12);
    &.default{
      background-color: $color-text-regular;
    }
    &.success{
      background-color: $color-success;
    }
    &.error{
      background-color: $color-danger;
    }
    &.warning{
      background-color: $color-warning;
    }
    &.white{
      color: $color-text-regular;
      background-color: $color-white;
    }
    .arrow{
      position: absolute;
      display: block;
      width: 8px;
      height: 8px;
      background: transparent;
      border-style: solid;
      border-width: 4px;
      transform: rotate(45deg);
      box-sizing: border-box;
    }
  }
}
</style>