<template>
  <div @click="handleClick" class="x-btn" :class="classMain">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'x-btn',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    plain: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'default'
    },
    disabled: {
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
    styleMain () {
      return {
        color: this.color,
        fontSize: this.size
      }
    },
    classMain () {
      return {
        [this.$style.c_noselect]: true,
        [this.$style.disabled]: this.disabled,
        [this.$style.no_disabled]: !this.disabled,
        [this.$style.main]: true,
        [this.$style[this.size + '-size']]: true,
        [this.$style.round]: this.round,
        [this.$style[this.type]]: !this.plain,
        [this.$style[this.type + '-plain']]: this.plain
      }
    }
  },
  methods: {
    handleClick () {
      !this.disabled && this.$emit('click')
    }
  },
  components: {
  }
}
</script>
<style module lang="scss">
@mixin variant(
  $border-color,
  $bg-color,
  $text-color,
  $border-hover-color,
  $bg-hover-color,
  $text-hover-color,
  $border-active-color,
  $bg-active-color,
  $text-active-color
) {
  border: 1px solid $border-color;
  background-color: $bg-color;
  color: $text-color;
  &.disabled{
    opacity: 0.6;
    cursor: not-allowed;
  }
  &.no_disabled{
    &:hover,
    &:focus{
      border: 1px solid $border-hover-color;
      background-color: $bg-hover-color;
      color: $text-hover-color;
    }
    &:active{
      border: 1px solid $border-active-color;
      background-color: $bg-active-color;
      color: $text-active-color;
    }
  }
}
.main{
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  -webkit-appearance: none;
  text-align: center;
  outline: none;
  font-weight: $bold-weight;
  box-sizing: border-box;
  &.default-size{
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    &.round{
      border-radius: 20px;
      padding: 12px 12px;
    }
  }
  &.small-size{
    padding: 9px 15px;
    font-size: 12px;
    border-radius: 3px;
    &.round{
      border-radius: 20px;
      padding: 9px 9px;
    }
  }
  &.primary{
    @include variant(
      $color-primary,
      $color-primary,
      $color-white,
      $color-primary-light,
      $color-primary-light,
      $color-white,
      $color-primary-dark,
      $color-primary-dark,
      $color-white
    )
  }
  &.primary-plain{
    @include variant(
      $color-primary-lighter,
      $color-primary-extra-light,
      $color-primary,
      $color-primary,
      $color-primary,
      $color-white,
      $color-primary-dark,
      $color-primary-dark,
      $color-white
    )
  }
  &.success{
    @include variant(
      $color-success,
      $color-success,
      $color-white,
      $color-success-light,
      $color-success-light,
      $color-white,
      $color-success-dark,
      $color-success-dark,
      $color-white
    )
  }
  &.success-plain{
    @include variant(
      $color-success-lighter,
      $color-success-extra-light,
      $color-success,
      $color-success,
      $color-success,
      $color-white,
      $color-success-dark,
      $color-success-dark,
      $color-white
    )
  }
  &.warning{
    @include variant(
      $color-warning,
      $color-warning,
      $color-white,
      $color-warning-light,
      $color-warning-light,
      $color-white,
      $color-warning-dark,
      $color-warning-dark,
      $color-white
    )
  }
  &.warning-plain{
    @include variant(
      $color-warning-lighter,
      $color-warning-extra-light,
      $color-warning,
      $color-warning,
      $color-warning,
      $color-white,
      $color-warning-dark,
      $color-warning-dark,
      $color-white
    )
  }
  &.danger{
    @include variant(
      $color-danger,
      $color-danger,
      $color-white,
      $color-danger-light,
      $color-danger-light,
      $color-white,
      $color-danger-dark,
      $color-danger-dark,
      $color-white
    )
  }
  &.danger-plain{
    @include variant(
      $color-danger-lighter,
      $color-danger-extra-light,
      $color-danger,
      $color-danger,
      $color-danger,
      $color-white,
      $color-danger-dark,
      $color-danger-dark,
      $color-white
    )
  }
  &.default,
  &.default-plain{
    @include variant(
      $border-color-base,
      $color-white,
      $color-text-regular,
      $color-primary-lighter,
      $color-primary-extra-light,
      $color-primary,
      $color-primary-dark,
      $color-primary-extra-light,
      $color-primary-dark
    )
  }
}
</style>
