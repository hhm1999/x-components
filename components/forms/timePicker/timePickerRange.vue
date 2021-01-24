<template>
  <div :class="classMain" v-x-clickoutside="handlerClickoutside">
    <template v-if="!dateTimeModel">
      <x-input
        :placeholder="placeholder"
        @click.native="handlerFoldClick"
        ref="input"
        readonly
        v-model="valueInput"
        :disabled="disabled"
      >
      </x-input>
      <div @click="handlerFoldClick" :class="classArrowIcon"><x-icon type="select-arrow"></x-icon></div>
      <div v-if="value!==null && !disabled" @click="handlerEmptyIconClick" :class="$style.empty_icon"><x-icon type="select-empty"></x-icon></div>
    </template>
    <component
      :is="panelContainer"
      :height="247"
      :show="dropDownShow || dateTimeModel"
      ref="dropDown"
      @hide="dropDownShow=false"
    >
      <template v-if="dropDownShow || dropDownIsInit || dateTimeModel">
        <div :class="classTimePickerWrap">
          <div :class="$style.time_picker_title">开始时间</div>
          <x-time-picker
            ref="startTimePicker"
            @dropDownShowChange="handlerDropDownShowChange"
            range-model
            :class="$style.time_picker"
            :disabled="disabled"
            :format="format"
            v-model="valueStart"
            :stepHours="stepHoursStart"
            :stepMinutes="stepMinutesStart"
            :stepSeconds="stepSecondsStart"
            :selectableRange="selectableRangeStartInternal"
            :disabledHour="disabledHourStartInternal"
            :disabledMinute="disabledMinuteStartInternal"
            :disabledSecond="disabledSecondStartInternal"
          >
          </x-time-picker>
        </div>
        <div :class="classTimePickerWrap">
          <div :class="$style.time_picker_title">结束时间</div>
          <x-time-picker
            ref="endTimePicker"
            @dropDownShowChange="handlerDropDownShowChange"
            range-model
            :class="$style.time_picker"
            :disabled="disabled"
            :format="format"
            v-model="valueEnd"
            :stepHours="stepHoursEnd"
            :stepMinutes="stepMinutesEnd"
            :stepSeconds="stepSecondsEnd"
            :selectableRange="selectableRangeEndInternal"
            :disabledHour="disabledHourEndInternal"
            :disabledMinute="disabledMinuteEndInternal"
            :disabledSecond="disabledSecondEndInternal"
          >
          </x-time-picker>
        </div>
      </template>
    </component>
  </div>
</template>
<script>
import timePickerRangeDateTimePanelContainer from './timePickerRangeDateTimePanelContainer.vue'
import utils from '../../utils/utils.js'
import trim from 'lodash/trim'
import * as moment from 'moment'
export default {
  name: 'x-time-picker-range',
  componentName: 'x-time-picker-range',
  formsMark: {
    name: 'x-time-picker-range',
    events: [
      // 'focus',
      // 'blur'
    ]
  },
  props: {
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      type: Array,
      default () {
        return null
      }
    },
    format: {
      type: String,
      default: 'HH:mm:ss'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    stepHoursStart: {
      type: Number,
      default: 1
    },
    stepMinutesStart: {
      type: Number,
      default: 1
    },
    stepSecondsStart: {
      type: Number,
      default: 1
    },
    stepHoursEnd: {
      type: Number,
      default: 1
    },
    stepMinutesEnd: {
      type: Number,
      default: 1
    },
    stepSecondsEnd: {
      type: Number,
      default: 1
    },
    selectableRangeStart: {
      type: [String, Array],
      default () {
        return null
      }
    },
    selectableRangeEnd: {
      type: [String, Array],
      default () {
        return null
      }
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
    dateTimeModel: {
      type: Boolean,
      default: false
    },
    noLimitStartEnd: { // 开始和结束不做禁用联动
      type: Boolean,
      default: false
    },
    verticalLayout: { // 竖向布局，主要用于日期时间范围选择状态下的移动端显示
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      valueStart: null,
      valueEnd: null,
      valueInput: null,
      dropDownShow: false,
      dropDownIsInit: false
    }
  },
  created () {
  },
  mounted() {
    !this.dateTimeModel && this.$refs.dropDown.open_setReferenceDom(this.$refs.input.$el)
  },
  watch: {
    value: {
      handler () {
        if (this.value) {
          if (this.value.length === 1) {
            this.valueStart = this.value[0]
          } else if (this.value.length === 2) {
            this.valueStart = this.value[0]
            this.valueEnd = this.value[1]
          }
        } else {
          this.valueStart = null
          this.valueEnd = null
        }
        this.setValueInput()
      },
      immediate: true
    },
    valueStart () {
      this.setValueInput()
    },
    valueEnd () {
      this.setValueInput()
    },
    valueInput (val) {
      if (val === undefined) {
        this.$emit('input', undefined)
      } else if (utils.isNullOrUndefined(this.valueStart) && utils.isNullOrUndefined(this.valueEnd)) {
        this.$emit('input', null)
      } else if (!utils.isNullOrUndefined(this.valueStart) && !utils.isNullOrUndefined(this.valueStart)) {
        this.$emit('input', [this.valueStart, this.valueEnd])
      } else if (!utils.isNullOrUndefined(this.valueEnd)) {
        this.$emit('input', [null, this.valueEnd])
      } else if (!utils.isNullOrUndefined(this.valueStart)) {
        this.$emit('input', [this.valueStart, null])
      }
    },
    dropDownShow (val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.startTimePicker.open_scrollToValue()
          this.$refs.endTimePicker.open_scrollToValue()
        })
        this.dropDownIsInit = true
      }
    }
  },
  computed: {
    classTimePickerWrap () {
      return {
        [this.$style.time_picker_wrap]: true,
        [this.$style.vertical_layout]: this.verticalLayout,
        [this.$style.horizontal_layout]: !this.verticalLayout
      }
    },
    panelContainer () {
      if (this.dateTimeModel) {
        return 'timePickerRangeDateTimePanelContainer'
      } else {
        return 'x-drop-down'
      }
    },
    standardFormat () {
      return utils.date.getStandardTimeFormat(this.format)
    },
    selectableRangeStartInternal () {
      return this.nonselectableMergeSelectable(this.nonselectableRangeStart, this.selectableRangeStart, 'start')
    },
    selectableRangeEndInternal () {
      return this.nonselectableMergeSelectable(this.nonselectableRangeEnd, this.selectableRangeEnd, 'end')
    },
    nonselectableRangeEnd () {
      if (this.valueStart && !this.noLimitStartEnd) {
        const minTime = utils.date.getMinTime(this.standardFormat)
        return minTime + '-' + this.momentSubtract(this.valueStart)
      }
      return null
    },
    nonselectableRangeStart () {
      if (this.valueEnd && !this.noLimitStartEnd) {
        const maxTime = utils.date.getMaxTime(this.standardFormat)
        return this.momentAdd(this.valueEnd) + '-' + maxTime
      }
      return null
    },
    classArrowIcon () {
      return {
        [this.$style.arrow_icon]: true,
        [this.$style.pack_up]: this.dropDownShow
      }
    },
    classMain () {
      return {
        [this.$style.main]: true,
        [this.$style.has_value]: this.value!==null && !this.disabled,
        [this.$style.disabled]: this.disabled,
        [this.$style.mobile]: utils.isMobile(),
        [this.$style.pc]: !utils.isMobile()
      }
    }
  },
  methods: {
    disabledHourStartInternal (value) {
      if (typeof this.disabledHour === 'function') {
        return this.disabledHour(value, 'start', this.valueEnd)
      }
      return false
    },
    disabledMinuteStartInternal (value, hour) {
      if (typeof this.disabledMinute === 'function') {
        return this.disabledMinute(value, hour, 'start', this.valueEnd)
      }
      return false
    },
    disabledSecondStartInternal (value, hour, minute) {
      if (typeof this.disabledSecond === 'function') {
        return this.disabledSecond(value, hour, minute, 'start', this.valueEnd)
      }
      return false
    },
    disabledHourEndInternal (value) {
      if (typeof this.disabledHour === 'function') {
        return this.disabledHour(value, 'end', this.valueStart)
      }
      return false
    },
    disabledMinuteEndInternal (value, hour) {
      if (typeof this.disabledMinute === 'function') {
        return this.disabledMinute(value, hour, 'end', this.valueStart)
      }
      return false
    },
    disabledSecondEndInternal (value, hour, minute) {
      if (typeof this.disabledSecond === 'function') {
        return this.disabledSecond(value, hour, minute, 'end', this.valueStart)
      }
      return false
    },
    nonselectableMergeSelectable (nonselectable, selectable) {
      if (nonselectable) {
        let newSelectableRange = []
        if (selectable && selectable.length > 0) {
          for (let i = 0; i < selectable.length; i++) {
            let start = trim(selectable[i].split('-')[0])
            let end = trim(selectable[i].split('-')[1])
            let startTime = moment(start, this.format)
            let endTime = moment(end, this.format)
            let nonselectableStart = trim(nonselectable.split('-')[0])
            let nonselectableEnd = trim(nonselectable.split('-')[1])
            let nonselectableStartTime = moment(nonselectableStart, this.format)
            let nonselectableEndTime = moment(nonselectableEnd, this.format)
            let nonselectableStartSubtract1 = this.momentSubtract(nonselectableStart)
            let nonselectableEndAdd1 = this.momentAdd(nonselectableEnd)
            if (nonselectableStartTime.isSameOrBefore(startTime) && nonselectableEndTime.isSameOrAfter(endTime)) { // 被禁止选中范围包括
            } else if (nonselectableStartTime.isSameOrAfter(startTime) && nonselectableEndTime.isSameOrBefore(endTime)) { // 包括禁止选中范围
              newSelectableRange.push(start + '-' + nonselectableStartSubtract1)
              newSelectableRange.push(nonselectableEndAdd1 + '-' + end)
            } else if (startTime.isSameOrBefore(nonselectableStartTime) && endTime.isSameOrAfter(nonselectableStartTime)) { // 上交集
              newSelectableRange.push(start + '-' + nonselectableStartSubtract1)
            } else if (startTime.isSameOrBefore(nonselectableEndTime) && endTime.isSameOrAfter(nonselectableEndTime)) { // 下交集
              newSelectableRange.push(nonselectableEndAdd1 + '-' + end)
            } else { // 都不是
              newSelectableRange.push(selectable[i])
            }
          }
        }
        if (newSelectableRange.length === 0) {
          let nonselectableStart = trim(nonselectable.split('-')[0])
          let nonselectableEnd = trim(nonselectable.split('-')[1])
          let minTime = utils.date.getMinTime(this.standardFormat)
          let maxTime = utils.date.getMaxTime(this.standardFormat)
          if (minTime !== this.momentSubtract(nonselectableStart)) {
            newSelectableRange.push(minTime + '-' + this.momentSubtract(nonselectableStart))
          } else {
            newSelectableRange.push(this.momentAdd(nonselectableEnd) + '-' + maxTime)
          }
        }
        return newSelectableRange
      } else if (selectable) {
        return selectable
      }
      return null
    },
    momentSubtract (timeString) {
      const original = moment(timeString, this.format).format(this.standardFormat)
      if (parseInt(this.replaceAll(original, ':', '')) === 0) {
        return original
      } else {
        return moment(timeString, this.format).subtract(1, 's').format(this.standardFormat)
      }
    },
    momentAdd (timeString) {
      const original = moment(timeString, this.format).format(this.standardFormat)
      if (this.replaceAll(this.replaceAll(original, ':', ''), '59', '') === '') {
        return original
      } else {
        return moment(timeString, this.format).add(1, 's').format(this.standardFormat)
      }
    },
    replaceAll (original, s1, s2){
      return original.replace(new RegExp(s1, 'gm'), s2)
    },
    setValueInput () {
      // if (this.valueStart === undefined || this.valueEnd === undefined) {
      //   this.valueStart = null
      //   this.valueEnd = null
      //   this.valueInput = undefined
      // } else {
      if (this.valueStart === null && this.valueEnd !== null) {
        this.valueStart = this.valueEnd
        this.$nextTick(() => {
          this.$refs.startTimePicker && this.$refs.startTimePicker.open_scrollToValue()
        })
      }
      if (this.valueEnd === null && this.valueStart !== null) {
        this.valueEnd = this.valueStart
        this.$nextTick(() => {
          this.$refs.endTimePicker && this.$refs.endTimePicker.open_scrollToValue()
        })
      }
      let start = ''
      let end = ''
      if (!utils.isNullOrUndefined(this.valueStart)) {
        start = this.valueStart
      }
      if (!utils.isNullOrUndefined(this.valueEnd)) {
        end = this.valueEnd
      }
      if (start.length === 0 && end.length === 0) {
        this.valueInput = null
      } else {
        this.valueInput = start + ' ~ ' + end
      }
    },
    open_scrollToValue () {
      this.$refs.startTimePicker && this.$refs.startTimePicker.open_scrollToValue()
      this.$refs.endTimePicker && this.$refs.endTimePicker.open_scrollToValue()
    },
    handlerClickoutside () {
      this.dropDownShow = false
    },
    handlerDropDownShowChange (val) {
      this.$refs.startTimePicker.open_setDropDownShow(val)
      this.$refs.endTimePicker.open_setDropDownShow(val)
    },
    handlerFoldClick () {
      !this.disabled && (this.dropDownShow = !this.dropDownShow)
    },
    handlerEmptyIconClick () {
      this.$emit('input', null)
    }
  },
  components: {
    timePickerRangeDateTimePanelContainer
  }
}
</script>
<style module lang="scss">
.time_picker_wrap{
  float: left;
  box-sizing: border-box;
  &.vertical_layout{
    width: 100%;
    &:last-child{
      border-top: 1px solid $border-color-light;
    }
  }
  &.horizontal_layout{
    width: 50%;
    &:last-child{
      border-left: 1px solid $border-color-light;
    }
  }
  .time_picker_title{
    height: 35px;
    line-height: 35px;
    text-align: center;
    box-sizing: border-box;
    border-bottom: 1px dashed $border-color-lighter;
    font-size: 14px;
    color: $color-text-regular;
  }
}
.main{
  width: 100%;
  position: relative;
  color: $color-text-regular;
  font-size: 14px;
  &.disabled{
    .arrow_icon{
      color: $color-text-placeholder;
      cursor: not-allowed;
    }
    .multiple_item_wrap{
      cursor: not-allowed;
    }
  }
  &.has_value{
    &.pc{
      &:hover{
        .empty_icon{
          display: block;
        }
        .arrow_icon{
          display: none;
        }
      }
    }
    &.mobile{
      .empty_icon{
        display: block;
      }
      .arrow_icon{
        display: none;
      }
    }
  }
  .empty_icon,
  .arrow_icon{
    cursor: pointer;
    position: absolute;
    right: 0px;
    top: 50%;
    margin-top: -20px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 12px;
    color: $color-text-placeholder;
    z-index: 2;
    &.pack_up{
      transform: rotate(180deg);
    }
  }
  .empty_icon{
    display: none;
    font-size: 14px;
    &:hover{
      color: $color-danger;
    }
  }
}
</style>
