<template>
  <div :class="classMain" @click="handlerClick">
    <div :class="$style.dot_wrap">
      <div :class="classDot">
        <div :class="$style.point"></div>
      </div>
    </div>
    <div :class="[$style.slot, $style.c_noselect]">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import utils from '../../utils/utils.js'
export default {
  name: 'x-radio',
  formsMark: {
    // name: 'x-input',
    // events: [
    //   'focus',
    //   'blur'
    // ]
  },
  props: {
    label: {
      type: [String, Number, Boolean],
      default: null
    },
    value: {
      type: [String, Number, Boolean],
      default: null
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
  watch: {
  },
  computed: {
    model: {
      get () {
        return this.group ? this.group.value : this.value
      },
      set (val) {
        if (this.group) {
          this.group.open_setValue(val)
        } else {
          if (this.model === val) {
            this.$emit('input', null)
          } else {
            this.$emit('input', val)
          }
        }
      }
    },
    group () {
      return utils.getParentByComponentName(this.$parent, 'x-radio-group')
    },
    selected () {
      if (!utils.isNullOrUndefined(this.label) && !utils.isNullOrUndefined(this.model) && this.label === this.model) {
        return true
      } else {
        return false
      }
    },
    classMain () {
      return {
        [this.$style.in_group]: !!this.group,
        [this.$style.main]: true,
        [this.$style.disabled]: this.disabled
      }
    },
    classDot () {
      return {
        [this.$style.dot]: true,
        [this.$style.selected]: this.selected,
        [this.$style.disabled]: this.disabled
      }
    }
  },
  methods: {
    handlerClick () {
      if (!this.disabled) {
        // if (this.group) {
        //   this.group.open_setValue(this.label)
        // } else {
        //   this.$emit('input', this.label)
        // }
        this.model = this.label
      }
    }
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  color: $color-text-regular;
  // font-weight: 500;
  line-height: 1;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  outline: none;
  font-size: 14px;
  &.disabled{
    color: $color-text-secondary;
    cursor: not-allowed;
  }
  &.in_group{
    margin-right: 30px;
    margin-top: 5px;
    margin-bottom: 5px;
    &:last-child {
      margin-right: 0;
    }
  }
  .dot_wrap{
    white-space: nowrap;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;
    width: 14px;
    height: 14px;
    .dot{
      border: 1px solid $border-color-base;
      border-radius: 100%;
      width: 14px;
      height: 14px;
      background-color: $color-white;
      position: relative;
      display: inline-block;
      box-sizing: border-box;
      &.disabled{
        background-color: $background-color-base;
        border-color: $border-color-light;
        &.selected{
          background-color: $background-color-base;
          border-color: $border-color-light;
          .point {
            background-color: $color-text-secondary;
          }
        }
      }
      .point {
        width: 4px;
        height: 4px;
        border-radius: 100%;
        background-color: #fff;
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%) scale(0);
        transition: transform .15s ease-in;
      }
      &.selected{
        border-color: $color-primary;
        background: $color-primary;
        .point {
          transform: translate(-50%,-50%) scale(1);
        }
      }
    }
  }
  .slot{
    line-height: 1;
    position: relative;
    display: inline-block;
    white-space: nowrap;
    outline: none;
    font-size: 14px;
    padding-left: 10px;
    box-sizing: border-box;
    vertical-align: middle;
    // margin-right: 30px;
  }
}
</style>
