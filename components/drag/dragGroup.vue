<template>
  <div ref="main" :class="[$style.drag_group, $style.c_cf]">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'x-drag-group',
  componentName: 'x-drag-group',
  props: {
    direction: { // 允许拖拽的方向 free自由拖拽 vertical垂直 horizontal 水平
      type: String,
      default: 'free'
    }
  },
  data () {
    return {
      childNodesInfo: []
    }
  },
  watch: {
  },
  computed: {
  },
  beforeCreate () {
  },
  created () {
  },
  mounted () {
  },
  updated () {
  },
  methods: {
    open_getDirection () {
      return this.direction
    },
    open_getSize () {
      return {
        width: this.$refs.main.offsetWidth,
        height: this.$refs.main.offsetHeight
      }
    },
    open_getAllChildLocationInfo: function () {
      var locationInfos = []
      var childNodes = this.getChildNodes()
      for (var i = 0; i < childNodes.length; i++) {
        var info = {
          offsetLeft: childNodes[i].offsetLeft,
          offsetTop: childNodes[i].offsetTop,
          offsetHeight: childNodes[i].offsetHeight,
          offsetWidth: childNodes[i].offsetWidth,
          el: childNodes[i]
        }
        locationInfos.push(info)
      }
      return locationInfos
    },
    getChildNodes: function () {
      var childNodes = []
      for (var i = 0; i < this.$el.childNodes.length; i++) {
        if (this.$el.childNodes[i].className &&
           this.$el.childNodes[i].className.indexOf('x-drag') !== -1) {
          childNodes.push(this.$el.childNodes[i])
        }
      }
      return childNodes
    },
    open_setLocationInfo (info) {
      this.childNodesInfo.push(info)
    },
    orderChange: function () {
      const childNodes = this.getChildNodes()
      const orderKeys = []
      for (let j = 0; j < childNodes.length; j++) {
        orderKeys.push(childNodes[j].getAttribute('order-key'))
      }
      this.$emit('order-change', orderKeys)
    },
    getIndex: function (el) {
      const childNodes = this.getChildNodes()
      for (let j = 0; j < childNodes.length; j++) {
        if (childNodes[j] === el) {
          return j
        }
      }
    }
  },
  components: {
  }
}
</script>

<style module lang="scss">
.drag_group{
  position: relative;
}
</style>
