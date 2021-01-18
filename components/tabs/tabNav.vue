<template>
  <div
    :class="$style.main"
    :style="styleMain"
  >
    <div
      :class="classItems(pane.name)"
      @click="handlerBarClick(pane.name)"
      :key="pane.name"
      v-for="pane in panes"
    >
      {{ pane.label }}
    </div>
  </div>
</template>
<script>
// import utils from '../utils/utils.js'
export default {
  name: 'x-tab-pane',
  props: {
    panes: {
      type: Array,
      default () {
        return null
      }
    },
    currentName: {
      type: [String, Number],
      default: null
    },
    height: {
      type: Number,
      default: 40
    },
    align: {
      type: String,
      default: 'initial'
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
        height: this.height + 'px',
        lineHeight: this.height + 'px',
        textAlign: this.align
      }
    }
  },
  methods: {
    handlerBarClick (paneName) {
      this.$emit('switch', paneName)
    },
    classItems (paneName) {
      return {
        [this.$style.items]: true,
        [this.$style.on]: this.currentName === paneName
      }
    }
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  box-sizing: border-box;
  border-bottom: 1px solid $border-color-light;
  color: $color-text-regular;
  font-size: 14px;
  .items{
    // color: $color-text-primary;
    font-weight: $bold-weight;
    height: 100%;
    // height: 40px;
    // line-height: 40px;
    display: inline-block;
    padding: 0 20px;
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
    &.on{
      color: $color-primary;
      &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -1px;
        width: 100%;
        height: 2px;
        background-color: $color-primary;
        z-index: 1;
      }
    }
  }
}
</style>
