<template>
  <div :class="$style.main">
    <input
      v-model.trim="valueInternal"
      :class="classInput"
      type="text"
      autocomplete="off"
      :readonly="readonly"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
      :placeholder="placeholder"
      :disabled="disabled"
      :style="inputStyle"
      ref="input"
    >
  </div>
</template>
<script>
import utils from '../../utils/utils.js'
export default {
  name: 'x-input',
  formsMark: {
    name: 'x-input',
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
      type: [String, Number],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    inputStyle: {
      type: Object,
      default: function () {
        return {}
      }
    },
    size: {
      type: String,
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
    value (val) {
      this.valueInternal = val
    },
    valueInternal (val) {
      this.$emit('input', val)
    }
  },
  computed: {
    classInput () {
      return {
        [this.$style.mini]: this.size === 'mini',
        [this.$style.small]: this.size === 'small',
        [this.$style.input]: true,
        [this.$style.disabled]: this.disabled,
        [this.$style.no_disabled]: !this.disabled,
        [this.$style.mobile]: utils.isMobile(),
        [this.$style.pc]: !utils.isMobile()
      }
    }
  },
  methods: {
    open_blur () {
      this.$refs.input.blur()
    },
    open_focus () {
      this.$refs.input.focus()
    }
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  @include inputAndTextarea;
  width: 100%;
  .input{
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: $color-white;
    border: 1px solid $border-color-base;
    border-radius: 4px;
    font-size: 14px;
    padding: 0 10px;
    box-sizing: border-box;
    outline: none;
    -webkit-appearance: none;
    &.small{
      line-height: 32px;
      height: 32px;
      font-size: 14px;
      padding: 0 7px;
    }
    &.mini{
      line-height: 28px;
      height: 27px;
      font-size: 12px;
      padding: 0 5px;
    }
    &::placeholder {
      color: $color-text-placeholder;
    }
    // &.mobile{
    // }
    &.pc{
      &.no_disabled{
        &:hover{
          border-color: $color-primary-lighter;
        }
      }
    }
    &:focus {
      border-color: $color-primary !important;
    }
    &.disabled{
      background-color: $background-color-base;
      border-color: $border-color-base;
      color: $color-text-secondary;
      cursor: not-allowed;
    }
  }
}
input[disabled]{
  border-color: $border-color-base;
  color: $color-text-secondary;
  -webkit-text-fill-color:$color-text-secondary;
  -webkit-opacity: 1;
  opacity: 1;
}
</style>
