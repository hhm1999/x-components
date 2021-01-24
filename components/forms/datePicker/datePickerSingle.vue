<template>
  <div :class="classMain" v-x-clickoutside="handlerClickoutside">
    <template v-if="!rangeModel">
      <x-input-imitation
        v-if="multipleModel"
        :showPlaceholder="!valueInternal || valueInternal.length === 0"
        :placeholder="placeholder"
        @click.native="handlerFoldClick"
        ref="input"
        :disabled="disabled"
        :focus="dropDownShow"
        :inputStyle="inputStyle"
      >
      </x-input-imitation>
      <x-input
        v-else
        :placeholder="placeholder"
        @click.native="handlerFoldClick"
        ref="input"
        readonly
        :disabled="disabled"
        v-model="valueInput"
      >
      </x-input>
      <div
        @click="handlerFoldClick"
        :class="$style.multiple_item_wrap"
        ref="multipleItemWrap"
        v-if="multipleModel"
      >
        <multipleItem
          :disabled="disabled"
          :style="styleMultipleItem"
          @del="handlerMultipleItemDel(index)"
          :key="item"
          v-for="(item, index) in valueInternal"
        >
          {{ item }}
        </multipleItem>
      </div>
      <div @click="handlerFoldClick" :class="classArrowIcon"><x-icon type="select-arrow"></x-icon></div>
      <div v-if="value!==null && !disabled" @click="handlerEmptyIconClick" :class="$style.empty_icon"><x-icon type="select-empty"></x-icon></div>
    </template>
    <component
      :is="calendarContainer"
      :height="calendarContainerHeight"
      :width="284"
      :show="dropDownShow || rangeModel"
      ref="dropDown"
      @hide="dropDownShow=false"
    >
      <template v-if="dropDownShow || dropDownIsInit || rangeModel">
        <template v-if="time">
          <x-tabs bar-align="center" :barHeight="35" v-model="dateTimeTabsCurrentName">
            <x-tab-pane label="日期" name="date">
              <calendar
                :disabledYear="disabledYearInternal"
                :disabledMonth="disabledMonthInternal"
                :disabledDay="disabledDayInternal"
                :type="typeInternal"
                :format="calendarFormat"
                :size="35"
                :rangeModel="rangeModel"
                :multipleModel="multipleModel"
                ref="calendar"
                v-model="valueCalendar"
                @stateChange="handlerCalendarStateChange"
                :hideCalendarHeaderPrevMonth="hideCalendarHeaderPrevMonth"
                :hideCalendarHeaderNextMonth="hideCalendarHeaderNextMonth"
                :hideCalendarHeaderPrevYear="hideCalendarHeaderPrevYear"
                :hideCalendarHeaderNextYear="hideCalendarHeaderNextYear"
                @updateHeaderDate="handlerUpdateHeaderDate"
                :disabledEmpty="disabledEmpty"
                :initDate="initDate"
              >
              </calendar>
            </x-tab-pane>
            <x-tab-pane label="时间" name="time">
              <x-time-picker
                ref="timePicker"
                :format="timePickerFormat"
                date-time-model
                v-model="valueTime"
                :panelHeight="280"
                :disabledHour="disabledHourInternal"
                :disabledMinute="disabledMinuteInternal"
                :disabledSecond="disabledSecondInternal"
                :stepHours="stepHours"
                :stepMinutes="stepMinutes"
                :stepSeconds="stepSeconds"
                :selectableRange="timePickerSelectableRange"
              >
              </x-time-picker>
            </x-tab-pane>
          </x-tabs>
        </template>
        <calendar
          v-else
          :disabledYear="disabledYearInternal"
          :disabledMonth="disabledMonthInternal"
          :disabledDay="disabledDayInternal"
          :type="typeInternal"
          :format="calendarFormat"
          :size="calendarSize"
          :rangeModel="rangeModel"
          :multipleModel="multipleModel"
          ref="calendar"
          v-model="valueCalendar"
          @stateChange="handlerCalendarStateChange"
          :hideCalendarHeaderPrevMonth="hideCalendarHeaderPrevMonth"
          :hideCalendarHeaderNextMonth="hideCalendarHeaderNextMonth"
          :hideCalendarHeaderPrevYear="hideCalendarHeaderPrevYear"
          :hideCalendarHeaderNextYear="hideCalendarHeaderNextYear"
          @updateHeaderDate="handlerUpdateHeaderDate"
          :disabledEmpty="disabledEmpty"
          :initDate="initDate"
        >
        </calendar>
      </template>
    </component>
  </div>
</template>
<script>
import * as moment from 'moment'
import trim from 'lodash/trim'
import calendar from './calendar.vue'
import datePickerRangePanelContainer from './datePickerRangePanelContainer.vue'
import utils from '../../utils/utils.js'
import multipleItem from '../inputImitation/multipleItem.vue'
export default {
  name: 'x-date-picker',
  componentName: 'x-date-picker',
  formsMark: {
    name: 'x-date-picker',
    events: [
    ]
  },
  props: {
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      type: [String, Array],
      default () {
        return null
      }
    },
    initDate: {
      type: String,
      default: undefined
    },
    time: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rangeModel: {
      type: Boolean,
      default: false
    },
    selectableRange: {
      type: [String, Array],
      default () {
        return null
      }
    },
    // size: {
    //   type: String,
    //   default: undefined
    // },
    calendarSize: {
      type: Number,
      default: 40
    },
    type: {
      type: String,
      default: 'days'
    },
    disabledDay: {
      type: Function,
      default: undefined
    },
    disabledMonth: {
      type: Function,
      default: undefined
    },
    disabledYear: {
      type: Function,
      default: undefined
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
    stepHours: {
      type: Number,
      default: 1
    },
    stepMinutes: {
      type: Number,
      default: 1
    },
    stepSeconds: {
      type: Number,
      default: 1
    },
    hideCalendarHeaderPrevMonth: {
      type: Boolean,
      default: undefined
    },
    hideCalendarHeaderNextMonth: {
      type: Boolean,
      default: undefined
    },
    hideCalendarHeaderPrevYear: {
      type: Boolean,
      default: undefined
    },
    hideCalendarHeaderNextYear: {
      type: Boolean,
      default: undefined
    },
    disabledEmpty: { // 原本选中不可选的日期将触发input事件将数据置空为null
      type: Boolean,
      default: undefined
    },
    multipleModel: {
      type: Boolean,
      default: undefined
    },
    format: {
      type: String,
      default () {
        if (this.time) {
          return 'YYYY-MM-DD HH:mm:ss'
        } else if (this.type === 'days') {
          return 'YYYY-MM-DD'
        } else if (this.type === 'months') {
          return 'YYYY-MM'
        } else if (this.type === 'years') {
          return 'YYYY'
        }
        return 'YYYY-MM-DD'
      }
    }
  },
  data () {
    return {
      blurNoHide: false,
      valueTime: null,
      valueCalendar: null,
      valueInternal: null,
      valueInput: null,
      dropDownShow: false,
      calendarContainerHeightOnlyDate: 332,
      dropDownIsInit: false,
      dateTimeTabsCurrentName: 'date',
      timePickerSelectableRange: null,
      inputHeight: 40,
      multipleItemMarginBottom: 0
    }
  },
  created () {
    this.setTimePickerSelectableRange()
  },
  mounted () {
    this.setReferenceDom()
    this.setInputStyle()
  },
  watch: {
    dateTimeTabsCurrentName (val) {
      if (val === 'time') {
        this.$nextTick(() => {
          this.$refs.timePicker.open_scrollToValue()
        })
      }
      this.blurNoHide = true
      // this.$refs.input.open_focus()
    },
    value: {
      handler (val) {
        this.valueInternal = val
        this.setInputStyle()
        if (val) {
          if (Array.isArray(val)) {
            let valueCalendarArray = []
            for (let i = 0; i < val.length; i++) {
              let valMoment = moment(val[i], this.format).format(this.calendarFormat)
              valueCalendarArray.push(valMoment)
            }
            this.valueCalendar = valueCalendarArray
          } else {
            let valMoment = moment(val, this.format)
            this.valueCalendar = valMoment.format(this.calendarFormat)
            if (this.time) {
              this.valueTime = valMoment.format(this.timePickerFormat)
            }
          }
        } else {
          this.valueCalendar = null
          this.valueTime = null
        }
      },
      immediate: true
    },
    valueInternal: {
      handler (val, oldVal) {
        if (Array.isArray(val)) {
          if (!oldVal || (val.toString() !== oldVal.toString())) {
            this.valueInput = val.toString()
            this.$emit('input', utils.clone(val))
          }
        } else {
          this.valueInput = val
          this.$emit('input', val)
        }
      },
      immediate: true
    },
    valueCalendar: {
      handler (val) {
        if (val === null) {
          this.valueInternal = null
          this.valueTime = null
        } else {
          if (Array.isArray(val)) {
            let completeDateArr = []
            for (let i = 0; i < val.length; i++) {
              completeDateArr.push(this.getCompleteDate(val[i]))
            }
            this.valueInternal = completeDateArr
          } else {
            this.valueTime = null
            this.valueInternal = this.getCompleteDate(val)
            this.setTimePickerSelectableRange()
          }
        }
        if (!this.time && val !== null) {
          if (this.rangeModel) {
            if (val && val.length === 2) {
              this.dropDownShow = false
            }
          } else if (!this.multipleModel) {
            this.dropDownShow = false
          }
        }
      },
      immediate: false
    },
    valueTime (val) {
      if (val && this.valueCalendar) {
        let valueTimeMomentObject = moment(val, this.timePickerFormat).toObject()
        let valueInternalMoment = null
        if (this.valueInternal) {
          valueInternalMoment = moment(this.valueInternal, this.format)
        } else {
          valueInternalMoment = moment(new Date(), this.format)
        }
        if (valueTimeMomentObject.hours !== undefined) {
          valueInternalMoment.set('hours', valueTimeMomentObject.hours)
        }
        if (valueTimeMomentObject.minutes !== undefined) {
          valueInternalMoment.set('minutes', valueTimeMomentObject.minutes)
        }
        if (valueTimeMomentObject.seconds !== undefined) {
          valueInternalMoment.set('seconds', valueTimeMomentObject.seconds)
        }
        this.valueInternal = valueInternalMoment.format(this.format)
      }
    },
    dropDownShow (val) {
      if (val) {
        this.$refs.input.open_focus()
        this.$nextTick(() => {
          this.$refs.calendar && this.$refs.calendar.open_setState(this.typeInternal)
        })
      } else {
        this.$refs.input.open_blur()
      }
      this.$emit('dropDownShowChange', val)
      val && (this.dropDownIsInit = true)
    }
  },
  computed: {
    styleMultipleItem () {
      return {
        marginBottom: this.multipleItemMarginBottom + 'px'
      }
    },
    selectableRangeInternal () {
      if (this.selectableRange && this.selectableRange.length > 0) {
        let selectableRange = null
        if (!Array.isArray(this.selectableRange)) {
          selectableRange = [this.selectableRange]
        } else {
          selectableRange = this.selectableRange
        }
        let selectableRangeInternalFilter = []
        for (let i = 0; i < selectableRange.length; i++) {
          selectableRangeInternalFilter.push([trim(selectableRange[i].split('~')[0]), trim(selectableRange[i].split('~')[1])])
        }
        return selectableRangeInternalFilter
      }
      return null
    },
    calendarContainerHeight () {
      if (this.time) {
        if (this.dateTimeTabsCurrentName === 'date') {
          return 327
        } else {
          return 317
        }
      } else {
        return this.calendarContainerHeightOnlyDate
      }
    },
    typeInternal () {
      if (this.time) {
        return 'days'
      } else {
        return this.type
      }
    },
    timePickerFormat () {
      if (this.time) {
        const timeFormat = utils.date.separateDateAndTimeFormat(this.format).time
        if (timeFormat) {
          return timeFormat
        }
        return undefined
      } else {
        return undefined
      }
    },
    calendarFormat () {
      if (this.time) {
        const dateFormat = utils.date.separateDateAndTimeFormat(this.format).date
        if (dateFormat) {
          return dateFormat
        }
        return undefined
      } else {
        return this.format
      }
    },
    calendarContainer () {
      if (this.rangeModel) {
        return 'datePickerRangePanelContainer'
      } else {
        return 'x-drop-down'
      }
    },
    inputStyle () {
      return {
        cursor: this.disabled ? 'not-allowed' : 'pointer',
        height: this.inputHeight + 'px',
        paddingRight: '40px'
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
    },
    classArrowIcon () {
      return {
        [this.$style.arrow_icon]: true,
        [this.$style.pack_up]: this.dropDownShow
      }
    },
    classInput () {
      return {
        [this.$style.input]: true,
        [this.$style.disabled]: this.disabled
      }
    }
  },
  methods: {
    open_getCalendarHeight () {
      return this.size * 8
    },
    handlerMultipleItemDel (index) {
      let newValue = utils.clone(this.value)
      newValue.splice(index, 1)
      this.$emit('input', newValue)
    },
    setInputStyle () {
      this.$nextTick(() => {
        if (this.$refs.multipleItemWrap && this.$refs.multipleItemWrap.offsetHeight > 40) {
          this.multipleItemMarginBottom = 10
          this.$nextTick(function () {
            this.inputHeight = this.$refs.multipleItemWrap.offsetHeight
            this.$nextTick(function () {
              this.$refs.dropDown.open_reset(this.$refs.input.$el)
            })
          })
        } else {
          this.inputHeight = 40
          this.multipleItemMarginBottom = 0
        }
      })
    },
    setReferenceDom () {
      if (!this.rangeModel && this.$refs.dropDown && this.$refs.input.$el) {
        this.$refs.dropDown.open_setReferenceDom(this.$refs.input.$el)
      }
    },
    setTimePickerSelectableRange () {
      if (this.time) {
        let timePickerSelectableRange = this.dateIsSelectableRangeEdge(this.valueCalendar)
        if (timePickerSelectableRange) {
          this.timePickerSelectableRange = [timePickerSelectableRange]
        } else {
          this.timePickerSelectableRange = null
        }
      }
    },
    disabledDayInternal (dayMoment) {
      let disabledDay = false
      if (typeof this.disabledDay === 'function') {
        disabledDay = this.disabledDay(dayMoment)
      }
      return disabledDay || this.getSelectableRangeDisabled(dayMoment, 'day')
    },
    disabledMonthInternal (monthMoment) {
      let disabledMonth = false
      if (typeof this.disabledMonth === 'function') {
        disabledMonth = this.disabledMonth(monthMoment)
      }
      return disabledMonth || this.getSelectableRangeDisabled(monthMoment, 'month')
    },
    disabledYearInternal (yearMoment) {
      let disabledYear = false
      if (typeof this.disabledYear === 'function') {
        disabledYear = this.disabledYear(yearMoment)
      }
      return disabledYear || this.getSelectableRangeDisabled(yearMoment, 'year')
    },
    getSelectableRangeDisabled (pMoment, precision) { // 判断是否在可选范围内
      let isDisabled = false
      if (this.selectableRangeInternal) {
        isDisabled = true
        for (let i = 0; i < this.selectableRangeInternal.length; i++) {
          let rangeStart = moment(this.selectableRangeInternal[i][0], this.format)
          let rangeEnd = moment(this.selectableRangeInternal[i][1], this.format)
          if (pMoment.isSameOrAfter(rangeStart, precision) && pMoment.isSameOrBefore(rangeEnd, precision)) {
            isDisabled = false
          }
        }
      }
      return isDisabled
    },
    open_updateData () {
      if (this.$refs.calendar) {
        this.$refs.calendar.open_updateData()
      }
    },
    getCompleteDate (valueCalendar) {
      let valueCalendarMoment = moment(valueCalendar, this.format)
      if (this.time) {
        let valueTimeMomentObject = null
        if (!this.valueTime) {
          let defaultHour = 0
          let defaultMinute = 0
          let defaultSecond = 0
          let timePickerSelectableRange = this.dateIsSelectableRangeEdge(this.valueCalendar)
          if (timePickerSelectableRange) {
            let timePickerSelectableRangeObject = moment(timePickerSelectableRange, this.format).toObject()
            defaultHour = timePickerSelectableRangeObject.hours
            defaultMinute = timePickerSelectableRangeObject.minutes
            defaultSecond = timePickerSelectableRangeObject.seconds
          }
          this.valueTime = moment({
            hour: defaultHour,
            minute: defaultMinute,
            second: defaultSecond
          }).format(this.timePickerFormat)
        }
        valueTimeMomentObject = moment(this.valueTime, this.timePickerFormat).toObject()
        if (valueTimeMomentObject.hours !== undefined) {
          valueCalendarMoment.set('hours', valueTimeMomentObject.hours)
        }
        if (valueTimeMomentObject.minutes !== undefined) {
          valueCalendarMoment.set('minutes', valueTimeMomentObject.minutes)
        }
        if (valueTimeMomentObject.seconds !== undefined) {
          valueCalendarMoment.set('seconds', valueTimeMomentObject.seconds)
        }
      }
      return valueCalendarMoment.format(this.format)
    },
    handlerUpdateHeaderDate (val) {
      this.$emit('updateCalendarHeaderDate', val)
    },
    dateIsSelectableRangeEdge (date) { // 判断日期是否在可选范围的边缘，用于确定是否限制时间选择
      if (this.selectableRangeInternal && date) {
        const dateMoment = moment(date)
        for (let i = 0; i < this.selectableRangeInternal.length; i++) {
          const start = moment(this.selectableRangeInternal[i][0])
          const end = moment(this.selectableRangeInternal[i][1])
          let timeStart = '00:00:00'
          let timeEnd = '23:59:59'
          if (dateMoment.isSame(start, 'day')) {
            timeStart = start.format('HH:mm:ss')
            return timeStart + '-' + timeEnd
          } else if (dateMoment.isSame(end, 'day')) {
            timeEnd = end.format('HH:mm:ss')
            return timeStart + '-' + timeEnd
          }
          return null
        }
      }
      return null
    },
    disabledHourInternal (value) {
      if (typeof this.disabledHour === 'function') {
        return this.disabledHour(value, this.valueCalendar ? moment(this.valueCalendar, this.format) : null)
      }
      return false
    },
    disabledMinuteInternal (value, hour) {
      if (typeof this.disabledMinute === 'function') {
        return this.disabledMinute(value, hour, this.valueCalendar ? moment(this.valueCalendar, this.format) : null)
      }
      return false
    },
    disabledSecondInternal (value, hour, minute) {
      if (typeof this.disabledSecond === 'function') {
        return this.disabledSecond(value, hour, minute, this.valueCalendar ? moment(this.valueCalendar, this.format) : null)
      }
      return false
    },
    handlerCalendarStateChange (state) {
      if (state === 'days') {
        this.calendarContainerHeightOnlyDate = 332
      } else if (state === 'months') {
        this.calendarContainerHeightOnlyDate = 243
      } else if (state === 'years') {
        this.calendarContainerHeightOnlyDate = 243
      }
    },
    handlerFocus () {
      this.dropDownShow = true
    },
    handlerFoldClick () {
      !this.disabled && (this.dropDownShow = !this.dropDownShow)
    },
    handlerEmptyIconClick () {
      this.$emit('input', null)
    },
    handlerClickoutside () {
      this.dropDownShow = false
    }
  },
  beforeDestroy () {
    this.dropDownShow = false
  },
  deactivated () {
    this.dropDownShow = false
  },
  activated () {
    this.setInputStyle()
    this.$nextTick(() => {
      this.setReferenceDom()
    })
  },
  components: {
    calendar,
    datePickerRangePanelContainer,
    multipleItem
  }
}
</script>
<style module lang="scss">
// .panel{
//   border-right: 1px dashed $border-color-lighter;
//   &:last-child{
//     border-right: none;
//   }
// }
.main{
  width: 100%;
  position: relative;
  color: $color-text-regular;
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
  &.pc{
    .empty_icon{
      &:hover{
        color: $color-danger;
      }
    }
  }
  .empty_icon{
    display: none;
    font-size: 14px;
  }
  .multiple_item_wrap{
    position: absolute;
    top: 0px;
    left: 0px;
    max-width: 100%;
    cursor: pointer;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 10px 40px 0px 10px;
    box-sizing: border-box;
  }
}
</style>
