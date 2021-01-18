<template>
  <div :class="$style.main">
    <slot></slot>
    <x-radio :disabled="option.disabled === undefined ? disabled : option.disabled" :key="option.value" v-for="option in options" :label="option.value">{{ option.label }}</x-radio>
  </div>
</template>
<script>
// import utils from '../utils/utils.js'
export default {
  name: 'x-radio-group',
  componentName: 'x-radio-group',
  formsMark: {
    // name: 'x-input',
    // events: [
    //   'focus',
    //   'blur'
    // ]
  },
  props: {
    value: {
      type: [String, Number, Boolean],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default () {
        return []
      }
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
  },
  methods: {
    open_setValue (val) {
      if (this.value === val) {
        this.$emit('input', null)
      } else {
        this.$emit('input', val)
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
  line-height: 1;
  vertical-align: middle;
  font-size: 0;
}
</style>
