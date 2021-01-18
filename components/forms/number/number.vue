<template>
  <div :class="$style.main">
    <input
      ref="input"
      v-model.trim="valueInternal"
      :class="classInput"
      type="text"
      autocomplete="off"
      :placeholder="placeholder"
      :disabled="disabled"
      @focus="$emit('focus')"
      @blur="handlerBlur"
    >
    <div @click="handleClickSubtract" :class="classSubtract">-</div>
    <div @click="handleClickAdd" :class="classAdd">+</div>
  </div>
</template>
<script>
import utils from '../../utils/utils.js'
export default {
  name: 'x-number',
  formsMark: {
    name: 'x-number',
    events: [
      'focus',
      'blur'
    ]
  },
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: [Number, String],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    precision: {
      type: Number,
      default: null
    },
    step: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
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
    max () {
      if (!utils.isNullOrUndefined(this.value) && !utils.isNullOrUndefined(this.max)) {
        if (this.value > this.max) {
          this.$emit('input', this.max - 0)
        }
      }
    },
    min () {
      if (!utils.isNullOrUndefined(this.value) && !utils.isNullOrUndefined(this.min)) {
        if (this.value < this.min) {
          this.$emit('input', this.min - 0)
        }
      }
    },
    value (val) {
      this.valueInternal = val
    },
    valueInternal (val) {
      // var legalNumber = this.getLegalNumber(val)
      // this.valueInternal = legalNumber
      // console.log(val)
      // console.log(val - 0)
      // console.log(val)
      if (val === null) {
        this.$emit('input', null)
      } else {
        this.$emit('input', this.getLegalNumber(val - 0))
      }
    }
  },
  computed: {
    subtractDisabled () {
      return (this.min !== null && this.value <= this.min) || this.disabled
    },
    addDisabled () {
      return (this.max !== null && this.value >= this.max) || this.disabled
    },
    classSubtract () {
      return {
        [this.$style.c_noselect]: true,
        [this.$style.subtract]: true,
        [this.$style.disabled]: this.subtractDisabled
      }
    },
    classAdd () {
      return {
        [this.$style.c_noselect]: true,
        [this.$style.add]: true,
        [this.$style.disabled]: this.addDisabled
      }
    },
    classInput () {
      return {
        [this.$style.input]: true,
        [this.$style.disabled]: this.disabled
      }
    }
  },
  methods: {
    handlerBlur () {
      this.valueInternal = this.getLegalNumber(this.valueInternal)
      this.$emit('blur')
    },
    getLegalNumber (val) { // 统一的合法数字获取
      let returnVal = null
      let valFloat = null
      let valString = val + ''
      if (valString > 16) { // 超过了mysql double类型和 parseFloat 可存储和可处理的最大长度
        valFloat = parseFloat(valString.substring(0, 16))
      } else {
        valFloat = parseFloat(valString)
      }
      if (!isNaN(valFloat)) {
        if (this.precision !== null) {
          returnVal = valFloat.toFixed(this.precision)
        } else {
          returnVal = valFloat
        }
        if (this.min !== null) {
          if (valFloat < this.min) {
            returnVal = this.min
          }
        }
        if (this.max !== null) {
          if (valFloat > this.max) {
            returnVal = this.max
          }
        }
      }
      return returnVal
    },
    handleClickSubtract () {
      // this.$refs.input.focus()
      if (!this.subtractDisabled) {
        this.valueInternal = this.getLegalNumber(this.valueInternal - this.step)
      }
    },
    handleClickAdd () {
      // this.$refs.input.focus()
      if (!this.addDisabled) {
        this.valueInternal = this.getLegalNumber(this.valueInternal - 0 + this.step)
      }
    }
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  @include inputAndTextarea;
  display: inline-block;
  height: 40px;
  position: relative;
  // overflow: hidden;
  &:hover{
    .input{
      border-color: $color-primary-lighter;
    }
  }
  .add,
  .subtract{
    cursor: pointer;
    font-size: 14px;
    right: 1px;
    position: absolute;
    width: 38px;
    height: 19px;
    line-height: 19px;
    text-align: center;
    background-color: $background-color-base;
    box-sizing: border-box;
    border-left: 1px solid $border-color-base;
    &:hover{
      color: $color-primary;
    }
  }
  .add{
    top: 1px;
    height: 20px;
    border-radius: 0px 4px 0px 0px;
    border-bottom: 1px solid $border-color-base;
  }
  .subtract{
    border-radius: 0px 0px 4px 0px;
    bottom: 1px;
  }
  .add,
  .subtract{
    &.disabled{
      color: $color-text-placeholder;
      cursor: not-allowed;
    }
  }
  .input{
    text-align: center;
    width: 150px;
    height: 40px;
    line-height: 40px;
    background-color: $color-white;
    border: 1px solid $border-color-base;
    border-radius: 4px;
    font-size: 14px;
    padding: 0 50px 0 10px;
    box-sizing: border-box;
    &::placeholder {
      color: $color-text-placeholder;
    }
    &:hover{
      border-color: $color-primary-lighter;
    }
    &:focus {
      border-color: $color-primary;
    }
    &.disabled{
      background-color: $background-color-base;
      border-color: $border-color-light;
      color: $color-text-regular;
      cursor: not-allowed;
    }
  }
}
</style>
