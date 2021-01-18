<template>
  <div :class="classMain">
    <slot></slot>
  </div>
</template>
<script>
import utils from '../utils/utils.js'
export default {
  name: 'x-hide-scroll-bar',
  props: {
    x: {
      type: Boolean,
      default: false
    },
    y: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
    classMain () {
      return {
        [this.$style.main]: true,
        [this.$style.x]: this.x && utils.dom.getScrollBarWidth() > 1,
        [this.$style.y]: this.y && utils.dom.getScrollBarWidth() > 1,
        [this.$style.x_no_take]: this.x && utils.dom.getScrollBarWidth() < 1,
        [this.$style.y_no_take]: this.y && utils.dom.getScrollBarWidth() < 1,
      }
    }
  },
  methods: {
  },
  components: {
  }
}
</script>
<style module lang="scss">
// @import '@/assets/css/mixins.scss';
.main{
  color: $color-text-regular;
  font-size: 14px;
  padding:0px;
  margin:0px;
  box-sizing: border-box;
  overflow: hidden;
  &.x{
    overflow-x: hidden;
    &:hover{
      overflow-x: auto;
    }
  }
  &.x_no_take{
    overflow-x: auto;
  }
  &.y{
    overflow-y: hidden;
    &:hover{
      overflow-y: auto;
    }
  }
  &.y_no_take{
    overflow-y: auto;
  }
}
</style>
