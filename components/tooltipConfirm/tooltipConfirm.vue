<template>
  <x-tooltip
    :class="$style.main"
    :placement="placement"
    v-x-clickoutside="handlerClickoutside"
    ref="tooltip"
    :visibility="tooltipVisibility"
    :interaction="false"
    type="white"
  >
    <div :class="[$style.content, $style.c_cf]" slot="content">
      <slot name="content">
        <p :class="$style.text"><x-icon :class="$style.icon" type="tooltip-confirm-tip"></x-icon>{{ content }}</p>
        <x-btn @click="handlerCancel" :class="$style.btn" size="small" :type="cancelBtnType">{{ cancelBtnText }}</x-btn>
        <x-btn @click="handlerConfirm" :class="$style.btn" size="small" :type="confirmBtnType">{{ confirmBtnText }}</x-btn>
      </slot>
    </div>
    <slot></slot>
  </x-tooltip>
</template>
<script>
import utils from '../utils/utils.js'
export default {
  name: 'x-tooltip-confirm',
  props: {
    placement: {
      type: String,
      default: 'top'
    },
    content: {
      type: String,
      default: '您确认该操作吗？'
    },
    visibility: {
      type: Boolean,
      default: undefined
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    },
    cancelBtnType: {
      type: String,
      default: 'default'
    },
    confirmBtnType: {
      type: String,
      default: 'primary'
    }
  },
  data () {
    return {
      visibilityInternal: false
    }
  },
  watch: {
  },
  computed: {
    tooltipVisibility () {
      return this.visibility !== undefined ? this.visibility : this.visibilityInternal
    }
  },
  beforeCreate() {
  },
  created () {
  },
  mounted () {
    this.interactionBind()
  },
  methods: {
    interactionBind () {
      utils.dom.on(this.$refs.tooltip.$el, 'click', this.handlerClick)
      // utils.dom.on(this.$refs.tooltip.$el, 'mouseleave', this.handlerLeave)
    },
    // interactionRemove () {
    //   utils.dom.remove(this.$refs.tooltip.$el, 'mouseenter', this.handlerEnter)
    //   utils.dom.remove(this.$refs.tooltip.$el, 'mouseleave', this.handlerLeave)
    // }
    handlerClickoutside (e) {
      if (!this.$refs.tooltip.open_actionInOneself(e)) {
        this.visibilityInternal = false
      }
    },
    handlerClick () {
      this.visibilityInternal = !this.visibilityInternal
    },
    handlerCancel () {
      this.$emit('cancel')
      this.visibilityInternal = false
    },
    handlerConfirm () {
      this.$emit('confirm')
      this.visibilityInternal = false
    }
  },
  beforeDestroy () {
  },
  destroyed () {
  },
  components: {
  }
}
</script>
<style module lang="scss">
.content{
  width: 200px;
  .text{
    margin-bottom: 8px;
    // height: 25px;
    line-height: 25px;
    font-size: 14px;
    .icon{
      color: $color-warning;
      margin-right: 5px;
    }
  }
  .btn{
    margin-left: 8px;
    float: right;
    margin-bottom: 2px;
  }
}
</style>
