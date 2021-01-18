<template>
  <div :class="$style.main">
    <div :class="$style.mask"></div>
    <svg :style="styleMain" :class="$style.icon" aria-hidden="true">
      <use :xlink:href="'#x-icon' + type"></use>
    </svg>
  </div>
</template>
<script>
export default {
  name: 'x-icon',
  props: {
    color: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
    styleMain () {
      return {
        color: this.color,
        fontSize: this.size
      }
    }
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  // @include basis;
  width: 1em;
  height: 1em;
  line-height: 1;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  .mask{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
  }
  .icon{
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
}
</style>
