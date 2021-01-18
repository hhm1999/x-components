<template>
  <div :class="$style.main">
    <slot></slot>
    <x-checkbox
      :disabled="option.disabled === undefined ? disabled : option.disabled"
      :key="option.value"
      v-for="option in options"
      :label="option.value"
    >
      {{ option.label }}
    </x-checkbox>
  </div>
</template>
<script>
import utils from '../../utils/utils.js'
export default {
  name: 'x-checkbox-group',
  componentName: 'x-checkbox-group',
  formsMark: {
    // name: 'x-input',
    // events: [
    //   'focus',
    //   'blur'
    // ]
  },
  props: {
    value: {
      type: Array,
      default: null
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
      let newValue = []
      if (Array.isArray(this.value)) {
        newValue = utils.clone(this.value)
      }
      let has = false
      let hasIndex = 0
      for (let i = 0; i < newValue.length; i++) {
        if (newValue[i] === val) {
          hasIndex = i
          has = true
          break
        }
      }
      if (has) {
        newValue.splice(hasIndex, 1)
      } else {
        newValue.push(val)
      }
      if (!this.value || (this.value.toString() !== newValue.toString())) {
        this.$emit('input', newValue)
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
  // display: inline-block;
  // line-height: 1;
  // vertical-align: middle;
  // font-size: 0;
}
</style>
