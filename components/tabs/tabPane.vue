<template>
  <div
    v-if="(!lazy || loaded) || active"
    v-show="active"
  >
    <slot></slot>
  </div>
</template>
<script>
// import utils from '../utils/utils.js'
export default {
  name: 'x-tab-pane',
  props: {
    label: {
      type: [String, Number],
      default: null
    },
    name: {
      type: [String, Number],
      default: null
    },
    lazy: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loaded: false
    }
  },
  created () {
  },
  watch: {
    active (val) {
      if (val) {
        this.loaded = true
      }
    }
  },
  computed: {
    active() {
      const active = this.$parent.value === this.name
      return active
    }
  },
  methods: {
  },
  components: {
  }
}
</script>
<style module lang="scss">
</style>
