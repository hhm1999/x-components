<template>
  <div @click="handleClick" :class="classMain">
    <div :class="$style.bg"></div>
    <div :class="$style.round"></div>
  </div>
</template>
<script>
export default {
  name: 'x-switch',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      valueInternal: null
    }
  },
  created () {
    this.valueInternal = this.value
  },
  watch: {
    value (val) {
      this.valueInternal = val
    },
    valueInternal (val) {
      this.$emit('input', val)
    }
  },
  computed: {
    classMain () {
      return {
        [this.$style.main]: true,
        [this.$style.yes]: this.value,
        [this.$style.disabled]: this.disabled
      }
    }
  },
  methods: {
    handleClick () {
      if (!this.disabled) {
        this.valueInternal = !this.valueInternal
      }
    }
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  // padding: 2px;
  box-sizing: border-box;
  height: 26px;
  // width: 48px;
  position: relative;
  vertical-align: middle;
  display: inline-block;
  cursor: pointer;
  transition: all .3s;
  &.disabled{
    opacity: 0.6;
    cursor: not-allowed;
    .round{
      box-shadow: 0 2px 4px 0 rgba(0, 35, 11, 0);
    }
  }
  &.yes{
    .bg{
      background-color: $color-success;
    }
    .round{
      left: 100%;
      margin-left: -2px;
      transform: translate3d(-100%, 0px, 0px);
    }
  }
  .bg{
    background-color: $border-color-base;
    border-radius: 12px;
    height: 22px;
    width: 44px;
  }
  .round{
    position: absolute;
    top: 2px;
    left: 2px;
    border-radius: 100%;
    transition: all .3s;
    width: 18px;
    height: 18px;
    background-color: $color-white;
    box-shadow: 0 2px 4px 0 rgba(0, 35, 11, 0.2);
  }
}
</style>
