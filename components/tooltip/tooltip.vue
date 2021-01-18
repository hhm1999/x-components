<script>
import Vue from 'vue'
import utils from '../utils/utils.js'
import container from './container'
export default {
  name: 'x-tooltip',
  props: {
    content: {
      type: [String, Number],
      default: null
    },
    placement: {
      type: String,
      default: undefined
    },
    visibility: {
      type: Boolean,
      default: false
    },
    interaction: {
      type: Boolean,
      default: true
    },
    disabled: { // 是否禁用
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'default'
    }
  },
  data () {
    return {
      containerComponent: null
    }
  },
  watch: {
    visibility: {
      handler (val) {
        if (this.isDisabled) {
          this.containerComponent.open_setVisibility(false)
        } else {
          this.containerComponent.open_setVisibility(val)
        }
      },
      immediate: false
    },
    isDisabled (val) {
      !val && this.containerComponent.open_setVisibility(this.visibility)
    },
    interaction (val) {
      !val && this.containerComponent.open_setVisibility(this.visibility)
    }
  },
  computed: {
    isDisabled () {
      if (this.disabled === undefined || this.disabled === true) {
        return true
      } else {
        return false
      }
    }
  },
  render () {
    return this.getFirstElement()
  },
  beforeCreate() {
  },
  created () {
    let that = this
    let instance = Vue.extend({
      render: function (createElement) {
        return createElement(
          container,
          {
            props: {
              placement: that.placement,
              interaction: that.interaction,
              type: that.type
            }
          },
          that.content || that.$slots.content)
      },
      data: function () {
        return {
        }
      },
      methods: {
        open_setReferenceDom (dom) {
          this.$children[0].open_setReferenceDom(dom)
        },
        open_setVisibility (visibility) {
          this.$children[0].open_setVisibility(visibility)
        },
        open_reset () {
          this.$children[0].open_reset()
        }
      }
    })
    this.containerComponent = new instance()
    this.containerComponent.$mount()
  },
  mounted () {
    this.containerComponent.open_setReferenceDom(this.$el)
    if (this.isDisabled) {
      this.containerComponent.open_setVisibility(false)
    } else {
      this.containerComponent.open_setVisibility(this.visibility)
    }
    this.interactionBind()
  },
  methods: {
    interactionBind () {
      utils.dom.on(this.$el, 'mouseenter', this.handlerEnter)
      utils.dom.on(this.$el, 'mouseleave', this.handlerLeave)
    },
    interactionRemove () {
      utils.dom.remove(this.$el, 'mouseenter', this.handlerEnter)
      utils.dom.remove(this.$el, 'mouseleave', this.handlerLeave)
    },
    open_reset () {
      this.containerComponent.open_reset()
    },
    handlerEnter () {
      this.interaction && this.show()
      this.$emit('show')
    },
    handlerLeave (e) {
      if (!this.open_actionInOneself(e)) {
        this.interaction && this.hide()
        this.$emit('hide')
      }
    },
    open_actionInOneself (e) {
      const toElement = utils.dom.getToElement(e)
      if (this.containerComponent.$el.contains(toElement)) {
        return true
      }
      return false
    },
    open_show () {
      this.show()
    },
    show () {
      !this.isDisabled && this.containerComponent.open_setVisibility(true)
    },
    hide () {
      !this.isDisabled && this.containerComponent.open_setVisibility(false)
    },
    getFirstElement() {
      const slots = this.$slots.default
      if (!Array.isArray(slots)) return null
      let element = null
      for (let index = 0; index < slots.length; index++) {
        if (slots[index] && slots[index].tag) {
          element = slots[index]
        }
      }
      return element
    }
  },
  beforeDestroy () {
    this.interactionRemove()
    this.containerComponent && this.containerComponent.$destroy()
  },
  destroyed () {
  },
  components: {
  }
}
</script>
<style module lang="scss">
</style>
