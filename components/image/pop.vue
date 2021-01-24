<template>
  <transition name="fade">
    <div v-show="visible" :style="mainStyle" :class="$style.main">
      <div @click="handelClose" :class="$style.close"><x-icon type="image-pop-close"></x-icon></div>
      <img :class="$style.img" ref="img" :style="imgStyle" :src="url" />
      <div @click="handelClose" :class="$style.mask"></div>
    </div>
  </transition>
</template>
<script>
import utils from '../utils/utils.js'
export default {
  name: 'message',
  data () {
    return {
      visible: false,
      url: null,
      zIndex: 0,
      imgWidth: 0,
      imgHeight: 0
    }
  },
  watch: {
  },
  computed: {
    imgStyle () {
      return {
        width: this.imgWidth,
        height: this.imgHeight
      }
    },
    mainStyle () {
      return {
        zIndex: this.zIndex
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
    open_show (url) {
      this.zIndex = utils.zIndex.nextZIndexThird()
      this.visible = true
      this.url = url
      const windowProportion = window.innerWidth / window.innerHeight
      this.$nextTick(() => {
        const imageProportion = this.$refs.img.naturalWidth / this.$refs.img.naturalHeight
        if (imageProportion > windowProportion) { // 图片相对于屏幕更宽
          this.imgWidth = this.$refs.img.naturalWidth > window.innerWidth ? window.innerWidth + 'px' : this.$refs.img.naturalWidth + 'px'
          this.imgHeight = 'auto'
        } else {
          this.imgHeight = this.$refs.img.naturalHeight > window.innerHeight ? window.innerHeight + 'px' : this.$refs.img.naturalHeight + 'px'
          this.imgWidth = 'auto'
        }
      })
    },
    handelClose () {
      this.visible = false
    }
  },
  beforeDestroy () {
  },
  components: {
  }
}
</script>
<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
  opacity: 0;
  // transform: translate(-50%,-100%);
}
</style>
<style module lang="scss">
.main{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  display: flex;
  align-items:center;
  justify-content:center;
  transition: opacity .1s;
  .img{
    z-index: 1;
  }
  .close{
    width: 35px;
    height: 35px;
    position: absolute;
    right: 20px;
    top: 20px;
    line-height: 33px;
    text-align: center;
    border: 1px solid $color-white;
    box-sizing: border-box;
    color: $color-white;
    border-radius: 18px;
    z-index: 2;
    cursor: pointer;
    &:hover{
      color: $color-primary;
      border-color: $color-primary;
    }
  }
  .mask{
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.65);
  }
}
</style>
