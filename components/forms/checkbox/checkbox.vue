<template>
  <div :class="classMain" @click="handlerClick">
    <div :class="$style.outline">
      <div :class="$style.symbol"></div>
    </div>
    <div :class="$style.label"><slot></slot></div>
  </div>
</template>
<script>
import utils from '../../utils/utils.js'
export default {
  name: 'x-checkbox',
  formsMark: {
    name: 'x-checkbox',
    events: [
      // 'focus',
      // 'blur'
    ]
  },
  props: {
    value: {
      default: null
    },
    label: {
      default: null
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    indeterminate: {
      type: Boolean,
      default: false
    },
    noChange: {
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
  watch: {
  },
  computed: {
    model: {
      get () {
        return this.group ? this.group.value : this.value
      },
      set () {
        if (this.group) {
          this.group.open_setValue(this.label)
        } else {
          this.$emit('input', !this.value)
        }
      }
    },
    group () {
      return utils.getParentByComponentName(this.$parent, 'x-checkbox-group')
    },
    classMain () {
      return {
        [this.$style.in_group]: !!this.group,
        [this.$style.main]: true,
        [this.$style.disabled]: this.disabled,
        [this.$style.indeterminate]: this.indeterminate,
        [this.$style.checked]: this.indeterminate || this.state === 'checked',
        [this.$style.no_checked]: !this.indeterminate && this.state !== 'checked'
      }
    },
    state () {
      if (this.checked) {
        return 'checked'
      }
      if (this.group) {
        if (this.model) {
          for (let i = 0; i < this.model.length; i++) {
            if (this.model[i] === this.label) {
              return 'checked'
            }
          }
        }
      } else {
        if (this.model === true ) {
          return 'checked'
        } else {
          return 'noChecked'
        }
      }
      return 'noChecked'
    }
  },
  methods: {
    handlerClick () {
      if (!this.noChange && !this.disabled) {
        this.model = null
      }
    }
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  display: inline-block;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  box-sizing: border-box;
  color: $color-text-regular;
  &.in_group{
    margin-right: 30px;
    margin-top: 5px;
    margin-bottom: 5px;
    &:last-child {
      margin-right: 0;
    }
  }
  &.disabled{
    cursor: not-allowed;
    .outline{
      background-color: $background-color-base !important;
      border-color: $border-color-base !important;
      .symbol{
        border-color: $color-text-secondary;
      }
    }
    .label{
      color: $color-text-secondary;
    }
  }
  &.indeterminate{
    .outline{
      .symbol{
        display: block;
        transform: rotate(0deg) scaleY(1);
        height: 2px;
        width: 8px;
        left: 3px;
        top: 6px;
      }
    }
  }
  &.checked{
    .outline{
      background-color: $color-primary;
      border-color: $color-primary;
      .symbol{
        display: block;
      }
    }
  }
  &.no_checked{
    &:hover{
      .outline{
        border-color: $color-primary;
      }
    }
  }
  .outline{
    font-size: 14px;
    line-height: 1;
    vertical-align: middle;
    display: inline-block;
    position: relative;
    top: -1px;
    box-sizing: border-box;
    border: 1px solid $border-color-base;
    width: 16px;
    height: 16px;
    border-radius: 2px;
    .symbol{
      box-sizing: border-box;
      display: none;
      transform: rotate(45deg) scaleY(1);
      border: 2px solid $color-white;
      border-left: 0;
      border-top: 0;
      height: 9px;
      width: 5px;
      left: 4px;
      position: absolute;
      top: 1px;
      transition: transform .15s ease-in .05s;
      transform-origin: center;
    }
  }
  .label{
    display: inline-block;
    padding-left: 10px;
    line-height: 19px;
    font-size: 14px;
    box-sizing: border-box;
  }
}
</style>
