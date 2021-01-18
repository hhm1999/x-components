<template>
  <div :class="$style.main">
    <textarea
      v-model.trim="valueInternal"
      :class="classInput"
      type="text"
      autocomplete="off"
      :placeholder="placeholder"
      :disabled="disabled"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
    >
    </textarea>
  </div>
</template>
<script>
export default {
  name: 'x-textarea',
  formsMark: {
    name: 'x-textarea',
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
        [this.$style.input]: true,
        [this.$style.disabled]: this.disabled
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
.main{
  width: 100%;
  .input{
    width: 100%;
    display: block;
    height: 89px;
    line-height: 25px;
    background-color: $color-white;
    border: 1px solid $border-color-base;
    border-radius: 4px;
    font-size: 14px;
    padding: 6px 10px;
    box-sizing: border-box;
    outline: none;
    -webkit-appearance: none;
    &::placeholder {
      color: $color-text-placeholder;
    }
    &:hover{
      border-color: $color-primary-lighter;
    }
    &:focus {
      border-color: $color-primary !important;
    }
    &.disabled{
      background-color: $background-color-base;
      border-color: $border-color-light;
      color: $color-text-placeholder;
      cursor: not-allowed;
    }
  }
}
textarea[disabled]{
  border-color: $border-color-base;
  color: $color-text-secondary;
  -webkit-text-fill-color:$color-text-secondary;
  -webkit-opacity: 1;
  opacity: 1;
}
</style>
