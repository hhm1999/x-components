<template>
  <div :class="$style.main" :style="styleMain">
    <div :class="$style.title">{{ title }}</div>
    <x-hide-scroll-bar y ref="options" :class="$style.options" :style="styleOptions">
      <div
        :style="styleItems(options.length === (index + 1))"
        @click="handlerSelect(option.value, index)"
        :class="classItems(option.value)"
        :key="option.value" v-for="(option, index) in options"
      >
        {{ option.value }}
      </div>
    </x-hide-scroll-bar>
  </div>
</template>
<script>
import * as moment from 'moment'
import utils from '../../utils/utils.js'
export default {
  props: {
    type: {
      type: String,
      default: null
    },
    step: {
      type: Number,
      default: 1
    },
    title: {
      type: String,
      default: null
    },
    value: {
      type: [String, Number],
      default: null
    },
    selectableRange: {
      type: Array,
      default () {
        return null
      }
    },
    height: {
      type: Number,
      default: 210
    },
    disabledHour: {
      type: Function,
      default: undefined
    },
    disabledMinute: {
      type: Function,
      default: undefined
    },
    disabledSecond: {
      type: Function,
      default: undefined
    },
    format: {
      type: String,
      default: 'HH:mm:ss'
    },
    completeValue: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      options: []
    }
  },
  created () {
    if (this.typeIntuitive === 'hours') {
      for (let i = 0; i < 24; i+=this.step) {
        this.options.push({
          value: i < 10 && this.alwaysTwo ? '0' + i : i
        })
      }
    } else if (this.typeIntuitive === 'minutes') {
      for (let i = 0; i < 60; i+=this.step) {
        this.options.push({
          value: i < 10 && this.alwaysTwo ? '0' + i : i
        })
      }
    } else if (this.typeIntuitive === 'seconds') {
      for (let i = 0; i < 60; i+=this.step) {
        this.options.push({
          value: i < 10 && this.alwaysTwo ? '0' + i : i
        })
      }
    }
    this.handleSelectedDisabled()
  },
  mounted () {
  },
  watch: {
    value (val) {
      console.log('########', this.type, val);
    },
    selectableRange: {
      handler () {
        this.handleSelectedDisabled()
      }
    }
  },
  computed: {
    completeValueMomentObject () {
      if (this.completeValue) {
        return moment(this.completeValue, this.format).toObject()
      }
      return null
    },
    hoursValue () {
      return this.completeValueMomentObject ? this.completeValueMomentObject.hours : null
    },
    minutesValue () {
      return this.completeValueMomentObject ? this.completeValueMomentObject.minutes : null
    },
    typeIntuitive () {
      if (this.type === 'HH' || this.type === 'H') {
        return 'hours'
      } else if (this.type === 'mm' || this.type === 'm') {
        return 'minutes'
      } else if (this.type === 'ss' || this.type === 's') {
        return 'seconds'
      }
      return null
    },
    styleMain () {
      return {
        height: this.height + 'px'
      }
    },
    styleOptions () {
      return {
        height: (this.height - 35) + 'px'
      }
    },
    alwaysTwo () {
      return this.type.length === 2
    }
  },
  methods: {
    handleSelectedDisabled () { // 处理选中了不可选选项的情况
      if ((this.value || this.value === 0) && this.getIsDisabledByValueSelectableRange(this.value) && this.selectableRange && this.selectableRange.length > 0) {
        this.$emit('input', this.options[this.selectableRange[0].start].value)
      }
      // if ((this.value || this.value === 0) && this.getIsDisabledByValueSelectableRange(this.value)) {
      //   this.$emit('input', undefined)
      // }
    },
    styleItems (isLast) {
      if (isLast) {
        return {
          'margin-bottom': (this.height - 35) - 35 + 'px'
        }
      }
      return null
    },
    getAnOptionalValue () {
      for (const option of this.options) {
        if (!this.getIsDisabledByValueCallBack(option.value)) {
          return option.value
        }
      }
      return undefined
    },
    getIsDisabledByValueCallBack (val) {
      let disabled = false
      if (this.typeIntuitive === 'hours' && typeof this.disabledHour === 'function') {
        disabled = this.disabledHour(val ? parseInt(val) : null)
      } else if (this.typeIntuitive === 'minutes' && typeof this.disabledMinute=== 'function') {
        disabled = this.disabledMinute(val ? parseInt(val) : null, this.hoursValue ? parseInt(this.hoursValue) : null)
      } else if (this.typeIntuitive === 'seconds' && typeof this.disabledSecond === 'function') {
        disabled = this.disabledSecond(val ? parseInt(val) : null, this.hoursValue ? parseInt(this.hoursValue) : null, this.minutesValue ? parseInt(this.minutesValue) : null)
      }
      return disabled
    },
    classItems (val) {
      const disabled = this.getIsDisabledByValueCallBack(val)
      const selected = (val === this.value)
      if (selected && disabled) {
        const that = this
        that.$nextTick(function () {
          that.$emit('input', this.getAnOptionalValue())
        })
      }
      return {
        [this.$style.items]: true,
        [this.$style.on]: selected,
        [this.$style.disabled]: disabled || this.getIsDisabledByValueSelectableRange(val)
      }
    },
    getIsDisabledByValueSelectableRange (pVal) {
      const val = parseInt(pVal)
      let isDisable = true
      if (this.selectableRange && this.selectableRange.length > 0) {
        for (let i = 0; i < this.selectableRange.length; i++) {
          if (val >= this.selectableRange[i].start && val <= this.selectableRange[i].end) {
            isDisable = false
            break
          }
        }
      } else {
        isDisable = false
      }
      return isDisable
    },
    open_scrollToValue () {
      if (this.value !== null) {
        this.scroll(this.getIndexByVal(this.value))
      }
    },
    handlerSelect (value, index) {
      if (!this.getIsDisabledByValueSelectableRange(value)) {
        this.$emit('select')
        this.$emit('input', value)
        this.scroll(index)
      }
    },
    scroll (index) {
      const from = this.$refs.options.$el.scrollTop
      const to = 35 * index
      utils.dom.scrollTop(this.$refs.options.$el, from, to, 500)
    },
    getIndexByVal (val) {
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].value === val) {
          return i
        }
      }
    }
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  height: 210px;
  float: left;
  width: 33.3%;
  overflow: hidden;
  font-size: 14px;
  color: $color-text-regular;
  .title{
    text-align: center;
    font-weight: $bold-weight;
    height: 35px;
    line-height: 35px;
  }
  .options{
    height: 175px;
    .items{
      font-size: 12px;
      height: 35px;
      line-height: 35px;
      cursor: pointer;
      text-align: center;
      // &:last-child{
      //   margin-bottom: 140px;
      // }
      &:hover{
        font-weight: $bold-weight;
        background-color: $background-color-base;
      }
      &.disabled{
        color: $color-text-placeholder;
        cursor: not-allowed;
        background-color: $color-white !important;
        &:hover{
          font-weight: normal;
          background-color: none;
        }
      }
      &.on{
        color: $color-primary;
        font-weight: $bold-weight !important;
        background-color: $background-color-base;
      }
    }
  }

}
</style>
