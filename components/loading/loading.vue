<template>
  <transition name="fade">
    <div :style="mainStyle" :class="$style.main">
      <div>
        <x-spin v-if="type === 'loading'" :size="size"></x-spin>
        <x-icon v-else :style="iconStyle" :class="iconClass" :type="iconType"></x-icon>
        <div :style="textStyle" :class="$style.text">
          <template v-if="type === 'loading'">
            {{ loadingText }}
          </template>
          <template v-else>
            <slot></slot>
          </template>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import utils from '../utils/utils.js'
export default {
  name: 'x-loading',
  props: {
    size: {
      type: Number,
      default: 42
    },
    type: {
      type: String,
      default: 'loading'
    },
    loadingText: {
      type: String,
      default: '加载中 ···'
    },
    fixed: {
      type: Boolean,
      default: false
    },
    // warningText: {
    //   type: String,
    //   default: '加载失败，请重试'
    // }
  },
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
    iconType () {
      return 'message-' + this.type
    },
    iconClass () {
      return {
        [this.$style.icon]: true,
        [this.$style.warning]: this.type === 'warning',
        [this.$style.error]: this.type === 'error',
        [this.$style.success]: this.type === 'success'
      }
    },
    iconStyle () {
      return {
        fontSize: this.size + 'px'
      }
    },
    mainStyle () {
      return {
        zIndex: utils.zIndex.nextZIndexThird(),
        position: this.fixed ? 'fixed' : 'absolute'
      }
    },
    textStyle () {
      let size = this.size / 3
      if (size < 12) {
        size = 12
      }
      return {
        fontSize: size + 'px'
      }
    }
  },
  methods: {
  },
  components: {
  }
}
</script>
<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
  opacity: 0;
}
</style>
<style module lang="scss">
.main{
  display: flex;
  position: absolute;
  align-items:center;
  justify-content:center;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background-color: $background-color-white-transparent;
  text-align: center;
  transition: opacity .2s;
  color: $color-text-regular;
  .text{
    width: 100%;
    text-align: center;
    font-size: 14px;
    margin-top: 10px;
  }
  .icon{
    &.warning{
      color: $color-warning;
    }
    &.error{
      color: $color-danger;
    }
    &.success{
      color: $color-success;
    }
  }
}
</style>
