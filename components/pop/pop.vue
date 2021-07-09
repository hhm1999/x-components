<template>
  <div v-show="visible" :class="$style.main" class="x-pop">
    <div :class="$style.mask" :style="styleMask"></div>
    <div :class="$style.pop" :style="stylePop">
      <div v-if="hasTitle" :class="$style.title">
        <div :class="[$style.content, $style.c_ellipsis]">{{ title }}</div>
        <div v-if="showClose" @click="hide" :class="$style.close"><x-icon type="pop-close"></x-icon></div>
      </div>
      <div :class="$style.body" :style="styleBody">
        <slot></slot>
      </div>
      <div :class="$style.footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import utils from '../utils/utils.js'
export default {
  name: 'x-pop',
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    showClose: {
      type: Boolean,
      default: true
    },
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: null
    },
    height: {
      type: Number,
      default: null
    },
    title: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      maskZIndex: utils.zIndex.nextZIndex(),
      popZIndex: utils.zIndex.nextZIndex()
    }
  },
  created () {
  },
  watch: {
    visible (val) {
      if (val) {
        this.maskZIndex = utils.zIndex.nextZIndex()
        this.popZIndex = utils.zIndex.nextZIndex()
        utils.banBodyScroll()
      } else {
        utils.removeBanBodyScroll()
      }
    }
  },
  computed: {
    hasTitle () {
      return !!this.title
    },
    bodyHeight () {
      if (this.hasTitle) {
        return this.popHeight - 50 - 60
      } else {
        return this.popHeight - 60
      }
    },
    popWidth () {
      if (this.width) {
        return this.width
      } else {
        return this.windowWidth * 0.6
      }
    },
    popHeight () {
      if (this.height) {
        return this.height
      } else {
        return this.windowHeight * 0.6
      }
    },
    windowWidth () {
      return window.innerWidth
    },
    windowHeight () {
      return window.innerHeight
    },
    styleBody () {
      return {
        height: this.bodyHeight + 'px'
      }
    },
    styleMask () {
      return {
        zIndex: this.maskZIndex
      }
    },
    stylePop () {
      return {
        top: (this.windowHeight - this.popHeight) / 2 + 'px',
        left: (this.windowWidth - this.popWidth) / 2 + 'px',
        width: this.popWidth + 'px',
        height: this.popHeight + 'px',
        zIndex: this.popZIndex
      }
    }
  },
  methods: {
    hide () {
      this.$emit('change', false)
    }
  },
  components: {
  }
}
</script>
<style scoped lang="scss">
.x-pop{
  .x-btn{
    margin-right: 10px;
  }
}
</style>
<style module lang="scss">
.main{
  color: $color-text-regular;
  position: absolute;
  .mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.65);
    filter: alpha(opacity=50);
  }
  .pop{
    position: fixed;
    background-color: $color-white;
    border-radius: $radius;
    .title{
      height: 50px;
      width: 100%;
      box-sizing: border-box;
      padding-right: 50px;
      border-bottom: 1px solid $border-color-base;
      padding-right: 50px;
      position: relative;
      .content{
        width: 100%;
        height: 100%;
        font-size: 16px;
        line-height: 50px;
        padding-left: 10px;
        box-sizing: border-box;
        font-weight: $bold-weight;
      }
      .close{
        position: absolute;
        right: 0px;
        top: 0px;
        height: 50px;
        width: 50px;
        line-height: 50px;
        font-size: 14px;
        text-align: center;
        color: $color-text-secondary;
        cursor: pointer;
        &:hover{
          color: $color-text-primary;
        }
      }
    }
    .body{
      width: 100%;
      overflow-y: auto;
    }
    .footer{
      text-align: right;
      line-height: 59px;
      height: 60px;
      box-sizing: border-box;
      border-top: 1px solid $border-color-base;
      .x-btn{
        margin-right: 10px;
      }
    }
  }
}
</style>
