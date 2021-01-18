<template>
  <transition name="fade">
    <div
      :class="mainClass"
      :style="mainStyle"
      v-show="visible"
      ref="main"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <!-- <div v-if="type === 'info'" class="ico-type">
        <x-icon type="message-info"></x-icon>
      </div>
      <div v-if="type === 'success'" class="ico-type">
        <x-icon type="message-success"></x-icon>
      </div>
      <div v-if="type === 'error'" class="ico-type">
        <x-icon type="message-error"></x-icon>
      </div>
      <div v-if="type === 'warning'" class="ico-type">
        <x-icon type="message-warning"></x-icon>
      </div> -->
      <div :class="$style.icon_type">
        <x-icon :class="$style.icon" :type="'message-' + type"></x-icon>
      </div>
      <div :class="$style.text" v-html="message"></div>
      <div v-if="showClose" @click="close" :class="$style.icon_close">
        <x-icon :class="$style.icon" type="message-close"></x-icon>
      </div>
    </div>
  </transition>
</template>
<script>
import utils from '../utils/utils.js'
export default {
  name: 'message',
  data () {
    return {
      showClose: false,
      visible: false,
      timer: null,
      duration: 3000,
      message: '',
      title: '',
      type: 'info',
      mainTop: 20
    }
  },
  watch: {
  },
  computed: {
    mainClass () {
      return {
        [this.$style.main]: true,
        [this.$style.info]: this.type === 'info',
        [this.$style.success]: this.type === 'success',
        [this.$style.error]: this.type === 'error',
        [this.$style.warning]: this.type === 'warning',
        [this.$style.has_close]: this.showClose,
        [this.$style.pc]: !utils.isMobile(),
        [this.$style.mobile]: utils.isMobile()
      }
    },
    mainStyle () {
      return {
        top: this.mainTop + 'px'
      }
    }
  },
  beforeCreate () {
  },
  created () {
  },
  mounted () {
  },
  updated () {
  },
  methods: {
    open_setData (data) {
      this.showClose = false
      this.duration = 3000
      this.message = ''
      this.title = ''
      this.type = 'info'
      for (var key in data) {
        this[key] = data[key]
      }
      this.startTimer()
    },
    open_show (top) {
      this.mainTop = top
      this.visible = true
    },
    // destroyElement () {
    //   var that = this
    //   that.clearTimer()
    //   setTimeout(() => {
    //     that.$el.parentNode.removeChild(this.$el)
    //     that.$destroy(true)
    //   }, 300)
    // },
    open_getVisible () {
      return this.visible
    },
    open_getHeight () {
      return this.$refs.main.offsetHeight
    },
    open_isAdjustPosition (top) {
      return top < this.mainTop
    },
    open_adjustPosition (top) {
      this.mainTop = top
    },
    open_getTop () {
      return this.mainTop
    },
    close () {
      this.clearTimer()
      let that = this
      // setTimeout(function () {
      that.visible = false
      that.$emit('hide', that.mainTop, that.$refs.main.offsetHeight)
      // }, 0)
    },
    clearTimer () {
      this.timer && clearTimeout(this.timer)
    },
    startTimer () {
      this.clearTimer()
      if (this.duration > 0) {
        var that = this
        this.timer = setTimeout(function () {
          that.close()
        }, this.duration)
      }
    }
  },
  components: {
  }
}
</script>
<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
  opacity: 0;
  transform: translate(-50%,-100%);
}
</style>
<style module lang="scss">
.main{
  min-width: 350px;
  border-radius: 4px;
  position: fixed;
  left: 50%;
  // top: 20px;
  transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  background-color:$color-white;
  border-width: 1px;
  border-style: solid;
  border-color: $border-color-lighter;
  background-color: $background-color-base;
  transition: opacity .2s,transform .3s,top .3s;
  overflow: hidden;
  padding: 15px 15px 15px 40px;
  box-sizing: border-box;
  &.mobile{
    width: 90%;
  }
  &.has_close{
    padding-right: 40px;
  }
  &.info{
    color: $color-text-regular;
  }
  &.success{
    color: $color-success;
    border-color: $color-success-very-light;
    background-color: $color-success-extra-light;
  }
  &.error{
    color: $color-danger;
    border-color: $color-danger-very-light;
    background-color: $color-danger-extra-light;
  }
  &.warning{
    color: $color-warning;
    border-color: $color-warning-very-light;
    background-color: $color-warning-extra-light;
  }
  .icon_type{
    left: 0px;
    top: 0px;
    height: 100%;
    width: 40px;
    display: flex;
    position: absolute;
    align-items:center;
    justify-content:center;
  }
  .icon_close{
    cursor: pointer;
    position: absolute;
    right: 0px;
    top: 0px;
    height: 100%;
    width: 40px;
    display: flex;
    align-items:center;
    justify-content:center;
    .icon{
      color: $color-text-placeholder;
      font-size: 12px;
      &:hover{
        color: $color-text-regular;
      }
    }
  }
  .text{
    display: inline-block;
    text-align: left;
    font-size: 14px;
  }
}
</style>
