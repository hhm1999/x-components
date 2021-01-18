<template>
  <div :class="$style.main">
    <div :class="classInput" :style="inputStyle"><span v-show="showPlaceholder" :class="$style.placeholder">{{ placeholder }}</span></div>
  </div>
</template>
<script>
export default {
  name: 'x-input-imitation',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    // focus: {
    //   type: Boolean,
    //   default: false
    // },
    showPlaceholder: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    inputStyle: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      focus: false
    }
  },
  created () {
  },
  watch: {
  },
  computed: {
    classInput () {
      return {
        [this.$style.focus]: this.focus,
        [this.$style.input]: true,
        [this.$style.disabled]: this.disabled
      }
    }
  },
  methods: {
    open_blur () {
      this.focus = false
    },
    open_focus () {
      this.focus = true
    }
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  width: 100%;
  font-size: 0;
  -webkit-text-size-adjust:none;
  .input{
    display: inline-block;
    width: 100%;
    height: 40px;
    line-height: 39px;
    min-height: 38px;
    background-color: $color-white;
    border: 1px solid $border-color-base;
    border-radius: 4px;
    font-size: 14px;
    padding: 0 10px;
    box-sizing: border-box;
    outline: none;
    -webkit-appearance: none;
    &::placeholder {
      color: $color-text-placeholder;
    }
    &:hover{
      border-color: $color-primary-lighter;
    }
    &.focus {
      border-color: $color-primary;
    }
    &.disabled{
      background-color: $background-color-base;
      border-color: $border-color-base;
      color: $color-text-secondary;
      cursor: not-allowed;
    }
    .placeholder{
      color: $color-text-placeholder;
    }
  }
}
</style>
