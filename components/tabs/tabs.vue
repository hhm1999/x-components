<template>
  <div :class="$style.main">
    <tabNav
      v-if="!barHide"
      :align="barAlign"
      :height="barHeight"
      @switch="handlerNavSwitch"
      :currentName="value"
      :panes="panes"
    >
    </tabNav>
    <div :class="$style.slot">
      <slot></slot>
    </div>
  </div>
</template>
<script>
// import utils from '../utils/utils.js'
import tabNav from './tabNav.vue'
export default {
  name: 'x-tabs',
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    barHeight: {
      type: Number,
      default: undefined
    },
    barAlign: {
      type: String,
      default: undefined
    },
    barHide: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      panes: []
    }
  },
  created () {
  },
  mounted () {
    this.getPaneInstances()
  },
  computed: {
  },
  methods: {
    handlerNavSwitch (paneName) {
      this.$emit('input', paneName)
    },
    getPaneInstances () {
      this.panes.splice(0, this.panes.length)
      for (var i = 0; i < this.$slots.default.length; i++) {
        var vNode = this.$slots.default[i]
        if (vNode.componentOptions && vNode.componentOptions.tag === 'x-tab-pane') {
          this.panes.push(vNode.componentInstance)
        }
      }
    }
  },
  components: {
    tabNav
  }
}
</script>
<style module lang="scss">
.main{
  width: 100%;
  .slot{
    box-sizing: border-box;
    // padding: 10px;
  }
}
</style>
