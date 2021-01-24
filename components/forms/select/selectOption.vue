<template>
  <div v-show="visibility" @click="handlerClick" :class="classMain">
    <slot :isSelect="isSelect">{{ showLabel }}</slot>
  </div>
</template>
<script>
import utils from '../../utils/utils.js'
export default {
  name: 'x-select-option',
  props: {
    value: {
      type: [String, Number, Object, Array],
      default () {
        return null
      }
    },
    label: {
      type: [String, Number],
      default: null
    },
    optionData: {
      type: Object,
      default () {
        return null
      }
    },
    stopSelect: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visibility: true,
      isSelect: false
    }
  },
  created () {
  },
  mounted() {
    this.toSelectParentAddOption()
  },
  watch: {
  },
  computed: {
    classMain () {
      return {
        [this.$style.c_ellipsis]: true,
        [this.$style.main]: true,
        [this.$style.disabled]: this.disabled,
        [this.$style.on]: this.isSelect
      }
    },
    showLabel () {
      return this.label ? this.label : this.value;
    },
    optionLabel () {
      return this.label || (this.$el && utils.trim(this.$el.textContent))
    },
    selectParent () {
      return utils.getParentByComponentName(this.$parent, 'x-select')
    },
    dropDownParent () {
      return utils.getParentByComponentName(this.$parent, 'x-drop-down')
    }
  },
  methods: {
    handlerClick () {
      if (this.disabled) {
        return
      }
      if (this.$listeners.select) {
        this.$emit('select', this.value)
      }
      !this.stopSelect && this.selectParent.open_select(this.value)
    },
    toSelectParentAddOption () { // 向父级添加选项数据
      this.selectParent.open_addOption(this.value, this.optionLabel, this.optionData, this)
    },
    open_setSelectState (isSelect) { // 父级调用改方法设置选中和非选中状态
      this.isSelect = isSelect
    },
    open_setParentVisibility (visibility) { // 父组件告知可见和不可见状态切换
      if (visibility && this.isSelect) {
        this.$nextTick(() => {
          this.dropDownParent.open_scrollMiddle(this.$el.offsetTop + this.$el.offsetHeight / 2)
        })
      }
    },
    open_setVisibility (visibility) { // 可见和不可见状态切换
      this.visibility = visibility
    }
  },
  beforeDestroy() {
    this.selectParent.open_destroyOption(this)
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  width: 100%;
  height: 35px;
  line-height: 35px;
  cursor: pointer;
  padding: 0 20px;
  box-sizing: border-box;
  font-size: 14px;
  color: $color-text-regular;
  &:hover{
    // font-weight: $bold-weight;
    background-color: $background-color-base;
  }
  &.disabled{
    color: $color-text-placeholder;
    cursor: not-allowed;
    background-color: $color-white !important;
  }
  &.on{
    color: $color-primary;
    font-weight: $bold-weight;
  }
}
</style>
