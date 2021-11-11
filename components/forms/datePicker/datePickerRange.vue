<template>
  <div :class="classMain" v-x-clickoutside="handlerClickoutside">
    <x-input
      @click.native="handlerFoldClick"
      :placeholder="placeholder"
      ref="input"
      readonly
      v-model="valueInput"
      :disabled="disabled"
    >
    </x-input>
    <div @click="handlerFoldClick" :class="classArrowIcon"><x-icon type="select-arrow"></x-icon></div>
    <div @click="handlerEmptyIconClick" :class="$style.empty_icon"><x-icon type="select-empty"></x-icon></div>
    <x-drop-down
      :height="dropDownHeight"
      :width="dropDownWidth"
      @hide="dropDownShow=false"
      :show="dropDownShow"
      ref="dropDown"
      :discriminateMobile="true"
    >
      <template v-if="dropDownShow || dropDownIsInit">
        <x-tabs bar-align="center" :bar-hide="!time" :barHeight="35" v-model="dateTimeTabsCurrentName">
          <x-tab-pane label="日期" name="date">
            <div :style="styleDatePickerWrap" :class="classDatePickerWrap">
              <x-date-picker
                ref="datePickerStart"
                range-model
                :calendarSize="calendarSize"
                :selectableRange="selectableRange"
                :disabledDay="disabledDayStart"
                :disabledYear="disabledYearStart"
                :disabledMonth="disabledMonthStart"
                v-model="valueStart"
                :format="format"
                @updateCalendarHeaderDate="handlerUpdateCalendarHeaderDateStart"
                :hideCalendarHeaderNextMonth="hideCalendarHeaderNextMonth"
                :hideCalendarHeaderNextYear="hideCalendarHeaderNextYear"
                :disabledEmpty="true"
                :initDate="initDateStart"
                :type="type"
              >
              </x-date-picker>
            </div>
            <div :style="styleDatePickerWrap" :class="classDatePickerWrap">
              <x-date-picker
                ref="datePickerEnd"
                range-model
                :calendarSize="calendarSize"
                :selectableRange="selectableRange"
                :disabledDay="disabledDayEnd"
                :disabledYear="disabledYearEnd"
                :disabledMonth="disabledMonthEnd"
                v-model="valueEnd"
                :format="format"
                @updateCalendarHeaderDate="handlerUpdateCalendarHeaderDateEnd"
                :hideCalendarHeaderPrevMonth="hideCalendarHeaderPrevMonth"
                :hideCalendarHeaderPrevYear="hideCalendarHeaderPrevYear"
                :disabledEmpty="true"
                :initDate="initDateEnd"
                :type="type"
              >
              </x-date-picker>
            </div>
          </x-tab-pane>
          <x-tab-pane v-if="time" label="时间" name="time">
            <x-time-picker-range
              ref="timePicker"
              v-model="timeRangeValue"
              :verticalLayout="this.isMobile"
              :noLimitStartEnd="timePickerNoLimitStartEnd"
              :disabledHour="disabledHourInternal"
              :disabledMinute="disabledMinuteInternal"
              :disabledSecond="disabledSecondInternal"
              :selectableRangeStart="timePickerSelectableRangeStart"
              :selectableRangeEnd="timePickerSelectableRangeEnd"
              dateTimeModel
            >
            </x-time-picker-range>
          </x-tab-pane>
        </x-tabs>
      </template>
    </x-drop-down>
  </div>
</template>
<script>
import utils from '../../utils/utils.js'
import trim from 'lodash/trim'
import * as moment from 'moment'
export default {
  name: 'x-date-picker-range',
  componentName: 'x-date-picker-range',
  formsMark: {
    name: 'x-date-picker-range',
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
    type: {
      type: String,
      default: 'days'
    },
    time: {
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
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disabledDay: {
      type: Function,
      default: undefined
    },
    disabledYear: {
      type: Function,
      default: undefined
    },
    disabledMonth: {
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
    selectableRange: {
      type: [String, Array],
      default () {
        return null
      }
    }
  },
  data () {
    return {
      isMobile: utils.isMobile(),
      timePickerSelectableRangeStart: null,
      timePickerSelectableRangeEnd: null,
      dateTimeTabsCurrentName: 'date',
      stopWatchValue: false,
      stopWatchValueEnd: false,
      stopWatchValueStart: false,
      valueInputStart: null,
      valueInputEnd: null,
      valueStart: null,
      valueEnd: null,
      valueEndStopWatch: false,
      valueInput: null,
      dropDownIsInit: false,
      dropDownShow: false,
      calendarHeaderDateStart: null,
      calendarHeaderDateEnd: null,
      initDateStart: null,
      initDateEnd: null,
      timeRangeValue: null,
      timePickerNoLimitStartEnd: true
    }
  },
  created () {
    this.setInitDate()
    this.setTimePickerSelectableRange()
  },
  mounted() {
    this.setReferenceDom()
  },
  watch: {
    valueInputStart: 'watchValueInput',
    valueInputEnd: 'watchValueInput',
    timeRangeValue () {
      this.setValueInput()
    },
    value: {
      handler () {
        // if (this.isSame(val, oldVal)) {
        //   return
        // }
        if (this.stopWatchValue) {
          this.stopWatchValue = false
          return
        }
        if (this.value && this.value.length === 2) {
          this.valueStart = [this.value[0], this.value[1]]
          this.valueEnd = [this.value[0], this.value[1]]
          this.valueInputStart = this.value[0]
          this.valueInputEnd = this.value[1]
          this.stopWatchValueEnd = true
          this.stopWatchValueStart = true
          if (this.time) {
            this.timeRangeValue = [moment(this.value[0]).format(this.timeFormat), moment(this.value[1]).format(this.timeFormat)]
          }
          this.setInitDate()
        } else {
          this.valueStart = null
          this.valueEnd = null
          this.valueInputStart = null
          this.valueInputEnd = null
        }
        this.setValueInput()
      },
      immediate: true
    },
    valueStart (val, oldVal) {
      if (this.dateIsSame(this.valueStart, this.valueEnd)) {
        this.timePickerNoLimitStartEnd = false
      } else {
        this.timePickerNoLimitStartEnd = true
      }
      this.watchValue('start', val, oldVal, 'valueStartCopy', 'valueInputStart', 'valueInputEnd', 'valueEnd', 'valueEndCopy', 'stopWatchValueStart', 'stopWatchValueEnd')
      this.setTimePickerSelectableRange()
    },
    valueEnd (val, oldVal) {
      if (this.dateIsSame(this.valueStart, this.valueEnd)) {
        this.timePickerNoLimitStartEnd = false
      } else {
        this.timePickerNoLimitStartEnd = true
      }
      this.watchValue('end', val, oldVal, 'valueEndCopy', 'valueInputEnd', 'valueInputStart', 'valueStart', 'valueStartCopy', 'stopWatchValueEnd', 'stopWatchValueStart')
      this.setTimePickerSelectableRange()
    },
    dropDownShow (val) {
      val && (this.dropDownIsInit = true)
    },
    dateTimeTabsCurrentName (val) {
      if (val === 'time') {
        this.$nextTick(() => {
          this.$refs.timePicker.open_scrollToValue()
        })
      }
    }
  },
  computed: {
    valueMoment () {
      if (this.value && this.value.length === 2) {
        return [moment(this.value[0]), moment(this.value[1])]
      }
      return null
    },
    calendarHeaderDateEndMoment () {
      return moment(this.calendarHeaderDateEnd)
    },
    calendarHeaderDateStartMoment () {
      return moment(this.calendarHeaderDateStart)
    },
    calendarSize () {
      if (this.isMobile && this.type === 'days') {
        const tentative = Math.round(window.innerHeight / 20)
        return tentative > 40 ? 40 : tentative
      } else {
        return 35
      }
    },
    classDatePickerWrap () {
      return {
        [this.$style.date_picker_wrap]: true,
        [this.$style.mobile]: this.isMobile,
        [this.$style.pc]: !this.isMobile,
      }
    },
    styleDatePickerWrap () {
      let height = 'auto'
      if (this.isMobile) {
        if (this.time) {
          height = (this.dropDownHeight - 35 - 2 - 1) / 2
        } else {
          height = (this.dropDownHeight - 2 - 1) / 2
        }
      }
      return {
        height: this.isMobile ? (height + 'px') : 'auto',
        width: this.isMobile ? '100%' : '50%'
      }
    },
    timeFormat () {
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
    formatDate () {
      return utils.date.separateDateAndTimeFormat(this.format).date
    },
    formatTime () {
      return utils.date.separateDateAndTimeFormat(this.format).time
    },
    dropDownWidth () {
      if (this.isMobile) {
        return window.innerWidth * 0.85
      } else {
        return 520
      }
    },
    dropDownHeight () {
      const oneDayStateDatePicker = this.calendarSize * 8 + 10
      const oneMonthStateDatePicker = 201 + this.calendarSize
      const oneTimePicker = 245
      // var oneYearStateDatePicker = 201 + this.calendarSize
      let height = 0
      if (this.time) {
        if (this.dateTimeTabsCurrentName === 'date') {
          if (this.isMobile) {
            height = oneDayStateDatePicker * 2 + 35 + 1 + 2 // 35是tab bar的高度，1是中间分割线高度 2是上下边框的高度
          } else {
            height = oneDayStateDatePicker + 35 + 2 // 35是tab bar的高度， 2是上下边框的高度
          }
        } else {
          if (this.isMobile) {
            height = oneTimePicker * 2 + 35 + 2 // 35是tab bar的高度， 2是上下边框的高度
          } else {
            height = oneTimePicker + 35 + 2
          }
        }
      } else {
        if (this.isMobile) {
          if (this.type === 'days') {
            height = oneDayStateDatePicker * 2 + 1 + 2 // 1是中间分割线高度 2是上下边框的高度
          } else if (this.type === 'months' || this.type === 'years') {
            height = oneMonthStateDatePicker * 2 + 1 + 2 // 1是中间分割线高度 2是上下边框的高度
          }
        } else {
          if (this.type === 'days') {
            height = oneDayStateDatePicker + 2 // 2是上下边框的高度
          } else if (this.type === 'months' || this.type === 'years') {
            height = oneMonthStateDatePicker + 2
          }
        }
      }
      return height
    },
    hideCalendarHeaderPrevMonth () {
      if (this.calendarHeaderDateStart && this.calendarHeaderDateEnd) {
        const subtract = moment(this.calendarHeaderDateEnd, this.format).subtract(1, 'months')
        if (subtract.isAfter(moment(this.calendarHeaderDateStart, this.format), 'month')) {
          return false
        }
      }
      return true
    },
    hideCalendarHeaderNextMonth () {
      if (this.calendarHeaderDateStart && this.calendarHeaderDateEnd) {
        const add = moment(this.calendarHeaderDateStart, this.format).add(1, 'months')
        if (add.isBefore(moment(this.calendarHeaderDateEnd, this.format), 'month')) {
          return false
        }
      }
      return true
    },
    hideCalendarHeaderPrevYear () {
      if (this.calendarHeaderDateStart && this.calendarHeaderDateEnd) {
        let unit = null
        let num = 1
        if (this.type === 'days') {
          unit = 'month'
        } else if (this.type === 'months' || this.type === 'years') {
          unit = 'year'
          num = 12
        }
        const subtract = moment(this.calendarHeaderDateEnd, this.format).subtract(num, 'years')
        if (subtract.isAfter(moment(this.calendarHeaderDateStart, this.format), unit)) {
          return false
        }
      }
      return true
    },
    hideCalendarHeaderNextYear () {
      if (this.calendarHeaderDateStart && this.calendarHeaderDateEnd) {
        let unit = null
        let num = 1
        if (this.type === 'days') {
          unit = 'month'
        } else if (this.type === 'months' || this.type === 'years') {
          unit = 'year'
          num = 12
        }
        const add = moment(this.calendarHeaderDateStart, this.format).add(num, 'years')
        if (add.isBefore(moment(this.calendarHeaderDateEnd, this.format), unit)) {
          return false
        }
      }
      return true
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
        [this.$style.has_value]: this.valueInput && !this.disabled,
        [this.$style.disabled]: this.disabled,
        [this.$style.mobile]: utils.isMobile(),
        [this.$style.pc]: !utils.isMobile()
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
    }
  },
  methods: {
    isSame (val, oldVal) {
      if (typeof(val) !== typeof(oldVal)) {
        return false
      }
      if (typeof(val) === 'object' && val && oldVal && val.toString && oldVal.toString) {
        return val.toString() === oldVal.toString()
      }
      return val === oldVal
    },
    setInitDate () {
      if (this.value && this.value.length === 2) {
        let startMoment = moment(this.value[0], this.format)
        let endMoment = moment(this.value[1], this.format)
        this.initDateStart = startMoment.format(this.format)
        if (this.type === 'days' && startMoment.isSame(endMoment, 'months')) {
          this.initDateEnd = startMoment.add(1, 'months').format(this.format)
        } else if (this.type === 'months' && startMoment.isSame(endMoment, 'years')) {
          this.initDateEnd = startMoment.add(1, 'years').format(this.format)
        } else if (this.type === 'years') {
          let add = 0
          let interval = endMoment.get('year') - startMoment.get('year')
          if (interval < 12) {
            add = 1
          } else {
            add = (Math.ceil(interval / 12) - 1)
            if (add < 1) {
              add = 1
            }
          }
          let adjust = 0
          let initDateEndMoment = moment(this.value[0], this.format).add(add * 12, 'years')
          let distance = endMoment.get('years') - initDateEndMoment.get('years')
          if (distance > -1 && distance < 11) {
            adjust = Math.trunc((11 - distance) / 2)
          }
          this.initDateEnd = initDateEndMoment.subtract(adjust, 'years').format(this.format)
          this.initDateStart = startMoment.subtract(adjust, 'years').format(this.format)
        } else {
          this.initDateEnd = moment(endMoment).format(this.format)
        }
      } else {
        this.initDateStart = moment(new Date()).format(this.format)
        if (this.type === 'days') {
          this.initDateEnd = moment(new Date()).add(1, 'months').format(this.format)
        } else if (this.type === 'months') {
          this.initDateEnd = moment(new Date()).add(1, 'years').format(this.format)
        } else if (this.type === 'years') {
          this.initDateEnd = moment(new Date()).add(12, 'years').format(this.format)
        }
      }
    },
    setTimePickerSelectableRange () {
      if (this.time) {
        let timePickerSelectableRange = this.dateIsSelectableRangeEdge(this.valueInputStart)
        if (timePickerSelectableRange) {
          this.timePickerSelectableRangeStart = [timePickerSelectableRange]
        } else {
          this.timePickerSelectableRangeStart = null
        }
        timePickerSelectableRange = this.dateIsSelectableRangeEdge(this.valueInputEnd)
        if (timePickerSelectableRange) {
          this.timePickerSelectableRangeEnd = [timePickerSelectableRange]
        } else {
          this.timePickerSelectableRangeEnd = null
        }
      }
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
    dateIsSame () {
      if (this.valueInputStart && this.valueInputEnd) {
        if (moment(this.valueInputStart, this.format).format(this.formatDate) === moment(this.valueInputEnd, this.format).format(this.formatDate)) {
          return true
        }
      }
      return false
    },
    watchValueInput () {
      if (this.valueInputStart && this.valueInputEnd) {
        let newValue = [this.valueInputStart, this.valueInputEnd]
        this.$emit('input', newValue)
        // this.stopWatchValue = true
      } else {
        this.$emit('input', null)
        this.stopWatchValue = true
      }
    },
    valIsSame (val1, val2) {
      if (!utils.isNullOrUndefined(val1) && !utils.isNullOrUndefined(val2)) {
        const conversionVal1 = val1.toString ? val1.toString() : val1
        const conversionVal2 = val2.toString ? val2.toString() : val2
        return conversionVal1 === conversionVal2
      } else if (val1 === null && val2 === null) {
        return true
      } else if (val1 === undefined && val2 === undefined) {
        return true
      } else {
        return false
      }
    },
    watchValue (
      type,
      val,
      oldVal,
      valueCopy,
      precedenceValueInput,
      anotherValueInput,
      anotherValue,
      anotherValueCopy,
      stopWatch,
      anotherStopWatch
    ) {
      // console.log(type,
      //   val,
      //   oldVal,
      //   valueCopy,
      //   precedenceValueInput,
      //   anotherValueInput,
      //   anotherValue,
      //   anotherValueCopy,
      //   stopWatch,
      //   anotherStopWatch);
      if (this[stopWatch]) {
        // console.log(stopWatch);
        this[stopWatch] = false
        return
      }
      if (val && oldVal && (val.toString() === oldVal.toString())) {
        return
      }
      if (val && val.length >= 1) {
        if (!this.valueInputStart && !this.valueInputEnd) {
          this[precedenceValueInput] = val[0]
          if (this[anotherValue]) {
            this[anotherValue].splice(0, this[anotherValue].length)
            this[anotherValue].push(val[0])
          } else {
            this[anotherValue] = [val[0]]
          }
          if (val.length > 1) {
            val.splice(1, val.length)
            this[stopWatch] = true
          }
          this[anotherStopWatch] = true
        } else if (this.valueInputStart && this.valueInputEnd) {
          this.timeRangeValue = null
          this[precedenceValueInput] = val[val.length - 1]
          this[anotherValueInput] = null
          if (val.length === 2) {
            val.splice(0, 1)
            this[stopWatch] = true
          }
          if (this[anotherValue]) {
            this[anotherValue].splice(0, this[anotherValue].length)
          } else {
            this[anotherValue] = []
          }
          this[anotherValue].push(this[precedenceValueInput])
          this[anotherStopWatch] = true
        } else {
          if (moment(val[0], this.format).isBefore(moment(val[1], this.format))) {
            this.valueInputEnd = val[1]
            this.valueInputStart = val[0]
          } else {
            this.valueInputEnd = val[0]
            this.valueInputStart = val[1]
          }
          if (this[anotherValue]) {
            this[anotherValue].splice(0, this[anotherValue].length)
          } else {
            this[anotherValue] = []
          }
          this[anotherValue].push(this.valueInputStart, this.valueInputEnd)
          this[anotherStopWatch] = true
        }
      } else {
        this.valueInputEnd = null
        this.valueInputStart = null
      }
      this.setValueInput()
    },
    synchronousUpdateAnother (copy, tag, val, tagStop) {
      if (copy && copy.length > 0) {
        if (copy.length === 1) {
          if (moment(copy[0]).isSame(moment(val), 'month')) {
            if (this[tag]) {
              this[tag].splice(0, this[tag].length)
              this[tag].push(copy[0])
            } else {
              this[tag] = [copy[0]]
            }
            copy = null
            this[tagStop] = true
          }
        } else if (copy.length === 2) {
          if (moment(copy[0]).isSame(moment(val), 'month')) {
            if (this[tag]) {
              this[tag].splice(0, this[tag].length)
              this[tag].push(copy[0])
              this[tag].push(copy[1])
            } else {
              this[tag] = [copy[0], copy[1]]
            }
            copy = null
            this[tagStop] = true
          } else if (moment(copy[1]).isSame(moment(val), 'month')) {
            if (this[tag]) {
              this[tag].splice(0, this[tag].length)
              this[tag].push(copy[1])
              this[tag].push(copy[0])
            } else {
              this[tag] = [copy[1], copy[0]]
            }
            copy = null
            this[tagStop] = true
          }
        }
      }
    },
    handlerUpdateCalendarHeaderDateStart (val) {
      this.calendarHeaderDateStart = val
      this.synchronousUpdateAnother(this.valueStartCopy, 'valueStart', val, 'stopWatchValueStart')
    },
    handlerUpdateCalendarHeaderDateEnd (val) {
      this.calendarHeaderDateEnd = val
      this.synchronousUpdateAnother(this.valueEndCopy, 'valueEnd', val, 'stopWatchValueEnd')
    },
    setTimeData (date, timeIndex) {
      if (!this.time) {
        return date
      }
      const time = this.timeRangeValue[timeIndex]
      const timeObject = moment(time, this.formatTime).toObject()
      const dateMoment = moment(date)
      if (!utils.isNullOrUndefined(timeObject.hours)) {
        dateMoment.set('hours', timeObject.hours)
      }
      if (!utils.isNullOrUndefined(timeObject.minutes)) {
        dateMoment.set('minutes', timeObject.minutes)
      }
      if (!utils.isNullOrUndefined(timeObject.seconds)) {
        dateMoment.set('seconds', timeObject.seconds)
      }
      return dateMoment.format(this.format)
    },
    supplementTime () {
      if (!this.time) {
        return
      }
      this.setTimePickerSelectableRange()
      if (this.valueInputStart) {
        let defaultTimeStart = moment({h: 0, m: 0, s: 0}).format(this.formatTime)
        if (this.timePickerSelectableRangeStart) {
          defaultTimeStart = moment(this.timePickerSelectableRangeStart[0].split('-')[0], this.formatTime).format(this.formatTime)
        }
        if (!this.timeRangeValue || this.timeRangeValue.length < 1) {
          this.timeRangeValue = [defaultTimeStart]
        } else if (utils.isNullOrUndefined(this.timeRangeValue[0])) {
          this.$set(this.timeRangeValue, 0, defaultTimeStart)
        }
      }
      if (this.valueInputEnd) {
        let defaultTimeEnd = moment({h: 0, m: 0, s: 0}).format(this.formatTime)
        if (this.timePickerSelectableRangeEnd) {
          defaultTimeEnd = moment(this.timePickerSelectableRangeEnd[0].split('-')[1], this.formatTime).format(this.formatTime)
        }
        if (!this.timeRangeValue) {
          this.timeRangeValue = [null, defaultTimeEnd]
        } else if (this.timeRangeValue.length < 2) {
          this.timeRangeValue.push(defaultTimeEnd)
        } else if (utils.isNullOrUndefined(this.timeRangeValue[1])) {
          this.$set(this.timeRangeValue, 1, defaultTimeEnd)
        }
      }
    },
    setValueInput () {
      if (this.valueInputStart || this.valueInputEnd) {
        this.supplementTime()
        let start = ''
        if (this.valueInputStart) {
          start = this.setTimeData(this.valueInputStart, 0)
          this.valueInputStart = start
        }
        let end = ''
        if (this.valueInputEnd) {
          end = this.setTimeData(this.valueInputEnd, 1)
          this.valueInputEnd = end
        }
        this.valueInput = start + ' ~ ' + end
      } else {
        this.valueInput = null
        this.timeRangeValue = null
        this.valueStart = null
        this.valueEnd = null
        this.valueInputStart = null
        this.valueInputEnd = null
      }
    },
    handlerClickoutside () {
      this.dropDownShow = false
    },
    handlerFocus () {
      this.dropDownShow = true
    },
    handlerBlur () {
      this.dropDownShow = false
    },
    handlerFoldClick () {
      !this.disabled && (this.dropDownShow = !this.dropDownShow)
    },
    handlerEmptyIconClick () {
      this.$emit('input', null)
      this.valueInput = null
      this.timeRangeValue = null
      this.valueStart = null
      this.valueEnd = null
      this.valueInputStart = null
      this.valueInputEnd = null
    },
    disabledDayStart (dayMoment) {
      let disabled = false
      if (typeof this.disabledDay === 'function') {
        disabled = this.disabledDay(dayMoment)
      }
      // return disabled || this.calendarHeaderDateEndMoment.isSameOrBefore(dayMoment, 'month')
      return disabled
    },
    disabledDayEnd (dayMoment) {
      let disabled = false
      if (typeof this.disabledDay === 'function') {
        disabled = this.disabledDay(dayMoment)
      }
      return disabled
      // return disabled || this.calendarHeaderDateStartMoment.isSameOrAfter(dayMoment, 'month')
    },
    disabledYearStart (yearMoment) {
      let disabled = false
      if (typeof this.disabledYear === 'function') {
        disabled = this.disabledYear(yearMoment)
      }
      return disabled || this.calendarHeaderDateEndMoment.isBefore(yearMoment, 'year')
    },
    disabledYearEnd (yearMoment) {
      let disabled = false
      if (typeof this.disabledYear === 'function') {
        disabled = this.disabledYear(yearMoment)
      }
      return disabled || yearMoment.isBefore(this.calendarHeaderDateStartMoment, 'year')
    },
    disabledMonthStart (monthMoment) {
      let disabled = false
      if (typeof this.disabledMonth === 'function') {
        disabled = this.disabledMonth(monthMoment)
      }
      return disabled || this.calendarHeaderDateEndMoment.isSameOrBefore(monthMoment, 'month')
    },
    disabledMonthEnd  (monthMoment) {
      let disabled = false
      if (typeof this.disabledMonth === 'function') {
        disabled = this.disabledMonth(monthMoment)
      }
      return disabled || monthMoment.isSameOrBefore(this.calendarHeaderDateStartMoment, 'month')
    },
    disabledHourInternal (value, type, timeAnother) {
      if (typeof this.disabledHour === 'function') {
        return this.disabledHour(value, this.valueMoment, type, timeAnother)
      }
      return false
    },
    disabledMinuteInternal (value, hour, type, timeAnother) {
      if (typeof this.disabledMinute === 'function') {
        return this.disabledMinute(value, hour, this.valueMoment, type, timeAnother)
      }
      return false
    },
    disabledSecondInternal (value, hour, minute, type, timeAnother) {
      if (typeof this.disabledSecond === 'function') {
        return this.disabledSecond(value, hour, minute, this.valueMoment, type, timeAnother)
      }
      return false
    },
    setReferenceDom () {
      this.$refs.dropDown.open_setReferenceDom(this.$refs.input.$el)
    }
  },
  beforeDestroy () {
    this.dropDownShow = false
  },
  deactivated () {
    this.dropDownShow = false
  },
  activated () {
    this.$nextTick(() => {
      this.setReferenceDom()
    })
  },
  components: {
  }
}
</script>
<style module lang="scss">
.date_picker_wrap{
  width: 50%;
  height: 100%;
  float: left;
  box-sizing: border-box;
  &.pc{
    &:last-child{
      border-left: 1px solid $border-color-light;
    }
  }
  &.mobile{
    &:last-child{
      border-top: 1px solid $border-color-light;
    }
  }
  .date_picker_title{
    height: 35px;
    line-height: 35px;
    text-align: center;
    box-sizing: border-box;
    border-bottom: 1px dashed $border-color-lighter;
  }
}
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
}
</style>
