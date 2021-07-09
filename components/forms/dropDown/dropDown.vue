<template>
  <div @click="handlerClcik" v-show="show" ref="main" :style="styleMain" :class="$style.main">
    <!-- <div :class="$style.mobile_close">
      <x-icon type="pop-close" @click.native="$emit('hide')"></x-icon>
    </div> -->
    <div ref="content" :class="$style.content" :style="styleContent">
      <slot></slot>
    </div>
    <x-btn @click="$emit('hide')" :style="styleConfirmBtn" :class="$style.confirm_btn" v-if="isMobile" type="primary">确 定</x-btn>
  </div>
</template>
<script>
import scssVariable from '../../assets/css/variableJs.scss'
import utils from '../../utils/utils.js'
export default {
  name: 'x-drop-down',
  componentName: 'x-drop-down',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: 'matchReferenceDom'
    },
    height: {
      type: Number,
      default: null
    },
    discriminateMobile: {
      type: Boolean,
      default: false
    },
    priorityDirectionVertical: {
      type: String,
      default: 'bottom'
    },
  },
  data () {
    return {
      keepPositionSetTimeout: null,
      utils: utils,
      referenceDomSizeInfo: null,
      zIndex: utils.zIndex.nextZIndex(),
      isAppend: false,
      mainStyleWidth: 0,
      mainStyleTop: 0,
      mainStyleBottom: 0,
      mainStyleLeft: 'auto',
      mainStyleRight: 'auto',
      referenceDom: null,
      dropDownContainer: null,
      showDirectionVertical: 'bottom' // 垂直显示方向
    }
  },
  created () {
  },
  mounted () {
  },
  updated () {
    this.setLocation()
  },
  watch: {
    width: function () {
      this.setLocation()
    },
    show: function (val) {
      if (val) {
        if (this.isMobile) {
          utils.banBodyScroll()
        }
        this.keepPosition()
        this.zIndex = utils.zIndex.nextZIndex()
        if (!this.isAppend) {
          this.isAppend = true
          if (!this.$parent.popperElm) {
            this.$parent.popperElm = [];
          }
          this.$parent.popperElm.push(this.$el);
          this.$nextTick(() => {
            // that.dropDownContainer = utils.dom.getParentByAttribute(that.$el, 'drop-down-container')
            this.dropDownContainer = null
            if (this.dropDownContainer) { // 相对于有drop-down-container属性的父级定位
              this.parentNode = this.dropDownContainer
              this.dropDownContainer.appendChild(this.$el)
            } else { // 相对于根节点定位
              this.parentNode = document.body
              document.body.appendChild(this.$el)
            }
            this.setLocation()
          })
        } else {
          this.$nextTick(function () {
            this.setLocation()
          })
        }
      } else {
        if (this.isMobile) {
          utils.removeBanBodyScroll()
        }
      }
    }
  },
  computed: {
    isMobile () {
      return this.discriminateMobile && utils.isMobile()
    },
    styleMain () {
      if (this.isMobile) {
        return {
          position: 'fixed',
          width: '100%',
          height: '100%',
          top: '0px',
          left: '0px',
          right: '0px',
          bottom: '0px',
          backgroundColor: 'rgba(0, 0, 0, 0.65)'
        }
      } else {
        return {
          width: this.mainStyleWidth + 'px',
          top: this.mainStyleTop === 'auto' ? 'auto' : this.mainStyleTop + 'px',
          bottom: this.mainStyleBottom === 'auto' ? 'auto' : this.mainStyleBottom + 'px',
          left: this.mainStyleLeft === 'auto' ? 'auto' : this.mainStyleLeft + 'px',
          right: this.mainStyleRight === 'auto' ? 'auto' : this.mainStyleRight + 'px',
          paddingTop: this.showDirectionVertical === 'bottom' ? '3px' : '0px',
          paddingBottom: this.showDirectionVertical === 'top' ? '3px' : '0px',
          zIndex: this.zIndex
        }
      }
    },
    styleContent () {
      if (this.isMobile) {
        let marginTop = 0
        if (this.height) {
          marginTop = ((window.innerHeight - this.height - 40) - 10) / 2
        }
        let width = null
        if (this.width === 'matchReferenceDom') {
          width = window.innerWidth * 0.9
        } else {
          width = this.width + 'px'
        }
        return {
          margin: marginTop + 'px auto 0 auto',
          width: width,
          height: this.height ? this.height + 'px' : '100%',
          maxHeight: this.height ? this.height + 'px' : '220px'
        }
      } else {
        return {
          boxShadow: scssVariable.boxShadowTiny,
          height: this.height ? this.height + 'px' : '100%',
          maxHeight: this.height ? this.height + 'px' : '220px'
        }
      }
    },
    styleConfirmBtn () {
      let width = this.width
      if (this.width === 'matchReferenceDom') {
        width = window.innerWidth * 0.9
      }
      return {
        width: width + 'px',
        marginTop: '10px'
      }
    }
  },
  methods: {
    handlerClcik (e) {
      if (this.isMobile && e.target === this.$refs.main) {
        this.$emit('hide')
      }
    },
    keepPosition () { // 因为统一使用相对于根节点的布局，所以需要定时器来防止嵌套可滚动容器的情况
      if (this.isMobile) {
        return
      }
      this.clearKeepPositionSetTimeout()
      this.setLocation()
      this.keepPositionSetTimeout = setTimeout(() => {
        if (this.show) {
          this.keepPosition()
        } else {
          this.clearKeepPositionSetTimeout()
        }
      }, 200)
    },
    clearKeepPositionSetTimeout () {
      if (this.keepPositionSetTimeout){
        clearTimeout(this.keepPositionSetTimeout)
        this.keepPositionSetTimeout = null
      }
    },
    open_scrollMiddle (y) { // 将指定y坐标滚动到视觉中心
      this.$nextTick(() => {
        this.$refs.content.scrollTop = y - this.$el.offsetHeight / 2
      })
    },
    open_setReferenceDom (referenceDom) { // 设置参照物
      this.referenceDom = referenceDom
    },
    open_reset () {
      this.setLocation()
    },
    setLocation () {
      if (!this.referenceDom || this.isMobile) {
        return
      }
      let referenceDomSizeInfo = null
      if (this.dropDownContainer) { // 相对于有drop-down-container属性的父级定位
        referenceDomSizeInfo = utils.dom.getLocationRelativeParent(this.referenceDom, this.dropDownContainer)
      } else { // 相对于根节点定位
        referenceDomSizeInfo = utils.dom.getLocationRelativeWindow(this.referenceDom)
      }
      if (referenceDomSizeInfo.rightSpace > 0 && (this.$el.offsetWidth > (referenceDomSizeInfo.width + referenceDomSizeInfo.rightSpace))) {
        this.mainStyleLeft = 'auto'
        this.mainStyleRight = referenceDomSizeInfo.rightSpace
      } else {
        this.mainStyleRight = 'auto'
        this.mainStyleLeft = referenceDomSizeInfo.left
      }
      if (this.priorityDirectionVertical === 'bottom') {
        if (referenceDomSizeInfo.bottomSpace < this.$el.offsetHeight && referenceDomSizeInfo.bottomSpace < referenceDomSizeInfo.topSpace) { // 输入框底部空间小于下拉组件的高度,且底部空间小于顶部空间
          this.showDirectionVertical = 'top'
          this.mainStyleBottom = referenceDomSizeInfo.bottom
          this.mainStyleTop = 'auto'
        } else {
          this.showDirectionVertical = 'bottom'
          this.mainStyleTop = referenceDomSizeInfo.top + referenceDomSizeInfo.height
          this.mainStyleBottom = 'auto'
        }
      } else {
        if (referenceDomSizeInfo.topSpace < this.$el.offsetHeight && referenceDomSizeInfo.topSpace < referenceDomSizeInfo.bottomSpace) { // 输入框底部空间小于下拉组件的高度,且底部空间小于顶部空间
          this.showDirectionVertical = 'bottom'
          this.mainStyleTop = referenceDomSizeInfo.top + referenceDomSizeInfo.height
          this.mainStyleBottom = 'auto'
        } else {
          this.showDirectionVertical = 'top'
          this.mainStyleBottom = referenceDomSizeInfo.bottom
          this.mainStyleTop = 'auto'
        }
      }
      if (utils.isMobile() || this.width === 'matchReferenceDom') {
        this.mainStyleWidth = referenceDomSizeInfo.width
      } else {
        this.mainStyleWidth = this.width
      }
    },
    destroy () {
      this.clearKeepPositionSetTimeout()
      this.referenceDom = null
      this.dropDownContainer = null
      let index;
      if (this.$parent.popperElm) {
        for (let i = 0; i < this.$parent.popperElm.length; i++) {
          if (this.$el === this.$parent.popperElm[i]) {
            index = i;
            break;
          }
        }
        this.$parent.popperElm.splice(index, 1);
      }
      this.parentNode && this.parentNode.removeChild(this.$el)
      this.parentNode = null
      this.isAppend = false
    }
  },
  beforeDestroy () {
    this.destroy()
  },
  deactivated () {
    this.destroy()
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  position: absolute;
  z-index: 9999;
  padding:0px;
  margin:0px;
  box-sizing: border-box;
  // .mobile_close{
  //   position: absolute;
  //   top: 0px;
  //   right: 0px;
  //   width: 40px;
  //   height: 40px;
  //   // background-color: red;
  //   color: $color-white;
  //   text-align: center;
  //   line-height: 40px;
  // }
  .content{
    padding:0px;
    margin:0px;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    background-color: $color-white;
    border-radius: 4px;
    border: 1px solid $border-color-light;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .confirm_btn{
    // position: absolute;
    // padding:0px;
    margin:0px;
    box-sizing: border-box;
    margin: 0 auto;
    display: block;
  }
}
</style>
