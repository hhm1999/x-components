<template>
  <div :class="[$style.main, $style.c_noselect]">
    <calendarHeader
      @nextMonth="handlerNextMonth"
      @prevMonth="handlerPrevMonth"
      @nextYear="handlerNextYear"
      @prevYear="handlerPrevYear"
      @wantSelectedYears="handlerWantSelectedYears"
      @wantSelectedMonths="handlerWantSelectedMonths"
      ref="calendarHeader"
      :date="calendarHeaderDate"
      :format="format"
      :state="state"
      :size="size"
      :hidePrevYear="hideCalendarHeaderPrevYear"
      :hideNextYear="hideCalendarHeaderNextYear"
      :hidePrevMonth="hideCalendarHeaderPrevMonth"
      :hideNextMonth="hideCalendarHeaderNextMonth"
    >
    </calendarHeader>
    <years
      v-if="state === 'years'"
      ref="years"
      :disabledYear="disabledYear"
      :headerDate="calendarHeaderDate"
      :date="yearsDate"
      :format="format"
      :disabledEmpty="disabledEmpty"
      :rangeModel="rangeModel"
      @selected="handlerSelectedYears"
    >
    </years>
    <months
      v-if="state === 'months'"
      ref="months"
      :headerDate="calendarHeaderDate"
      :date="monthsDate"
      :format="format"
      :disabledMonth="disabledMonthInternal"
      :disabledEmpty="disabledEmpty"
      :rangeModel="rangeModel"
      @selected="handlerSelectedMonths"
    >
    </months>
    <days
      v-if="state === 'days'"
      ref="days"
      :headerDate="calendarHeaderDate"
      :date="daysDate"
      :format="format"
      :displaySelected="true"
      :size="size"
      @selected="handlerSelectedDays"
      :disabledDay="disabledDayInternal"
      :onlyShowCurrentMonth="rangeModel"
      :rangeModel="rangeModel"
      :disabledEmpty="disabledEmpty"
    >
    </days>
  </div>
</template>
<script>
import utils from '../../utils/utils.js'
import * as moment from 'moment'
import calendarHeader from './calendarHeader.vue'
import days from './days.vue'
import months from './months.vue'
import years from './years.vue'
export default {
  props: {
    headerDate: {
      type: String,
      default: null
    },
    value: {
      type: [String, Array],
      default: null
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    size: {
      type: Number,
      default: undefined
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
    rangeModel: {
      type: Boolean,
      default: undefined
    },
    multipleModel: {
      type: Boolean,
      default: undefined
    },
    disabledEmpty: { // 原本选中不可选的日期将触发input事件将数据置空为null
      type: Boolean,
      default: undefined
    },
    initDate: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      calendarHeaderDate: null,
      daysDate: null,
      monthsDate: null,
      yearsDate: null,
      state: this.type,
      isFirstTimeWatchValue: true
    }
  },
  created () {
    if (this.initDate) {
      this.calendarHeaderDate = this.initDate
    } else if (this.value && this.value.length !== 0) {
      if (Array.isArray(this.value)) {
        if (this.value.length > 0) {
          this.calendarHeaderDate = this.value[0]
        }
      } else {
        this.calendarHeaderDate = this.value
      }
    } else {
      this.calendarHeaderDate = moment(new Date()).format(this.format)
    }
  },
  mounted () {
  },
  watch: {
    initDate (val) {
      if (val) {
        this.calendarHeaderDate = this.initDate
      }
    },
    calendarHeaderDate: {
      handler (val) {
        this.$emit('updateHeaderDate', val)
        if (this.type === 'days') { // 选日模式下月和年面板只负责显示日历的当前的月和年状态，并不显示当前value的状态
          // this.monthsDate = val
          // this.yearsDate = val
        }
      },
      immediate: true
    },
    value: {
      handler (val) {
        if (Array.isArray(val)) {
          if (val.length > 0) {
            this.daysDate = utils.clone(val)
            // this.type === 'months' && (this.monthsDate = utils.clone(val))
            // this.type === 'years' && (this.yearsDate = utils.clone(val))
            this.monthsDate = utils.clone(val)
            this.yearsDate = utils.clone(val)
          } else {
            this.daysDate = null
            // this.type === 'months' && (this.monthsDate = null)
            // this.type === 'years' && (this.yearsDate = null)
            this.monthsDate = null
            this.yearsDate = null
          }
        } else {
          this.daysDate = val
          // this.type === 'months' && (this.monthsDate = val)
          // this.type === 'years' && (this.yearsDate = val)
          this.monthsDate = val
          this.yearsDate = val
        }
      },
      immediate: true
    },
    state: {
      handler (val) {
        this.$emit('stateChange', val)
      },
      immediate: true
    }
  },
  computed: {
  },
  methods: {
    disabledDayInternal (dayMoment) {
      let disabledYear = false
      let disabledMonth = false
      let disabledDay = false
      if (!this.rangeModel) {
        if (typeof this.disabledYear === 'function') {
          disabledYear = this.disabledYear(dayMoment)
        }
        if (typeof this.disabledMonth === 'function') {
          disabledMonth = this.disabledMonth(dayMoment)
        }
      }
      if (typeof this.disabledDay === 'function') {
        disabledDay = this.disabledDay(dayMoment)
      }
      return disabledYear || disabledMonth || disabledDay
    },
    disabledMonthInternal (monthMoment) {
      let disabledYear = false
      if (typeof this.disabledYear === 'function') {
        disabledYear = this.disabledYear(monthMoment)
      }
      let disabledMonth = false
      if (typeof this.disabledMonth === 'function') {
        disabledMonth = this.disabledMonth(monthMoment)
      }
      return disabledYear || disabledMonth
    },
    open_updateData () {
      if (this.$refs.years) {
        this.$refs.years.open_updateData()
      }
      if (this.$refs.months) {
        this.$refs.months.open_updateData()
      }
      if (this.$refs.days) {
        this.$refs.days.open_updateData()
      }
    },
    open_setState (state) {
      this.state = state
    },
    handlerNextYear () {
      let number = this.state === 'years' ? 12 : 1
      this.addOrSubtract(number, 'year')
    },
    handlerPrevYear () {
      let number = this.state === 'years' ? -12 : -1
      this.addOrSubtract(number, 'year')
    },
    handlerNextMonth () {
      this.addOrSubtract(1, 'month')
    },
    handlerPrevMonth () {
      this.addOrSubtract(-1, 'month')
    },
    addOrSubtract (number, unit) {
      let currentMoment = null
      if (this.calendarHeaderDate) {
        currentMoment = moment(this.calendarHeaderDate, this.format)
      } else {
        currentMoment = moment()
      }
      this.calendarHeaderDate = currentMoment.add(number, unit).format(this.format)
    },
    adjustDateArrayStartAndEnd (dates) { // 调整日期数组的开始和结束顺序
      if (dates && Array.isArray(dates) && dates.length === 2) {
        if (moment(dates[0], this.format).isBefore(moment(dates[1], this.format))) {
          return [dates[0], dates[1]]
        } else {
          return [dates[1], dates[0]]
        }
      }
      return dates
    },
    handlerMultipleModelSelected (value) {
      let newValues = []
      if (Array.isArray(this.value)) {
        newValues = utils.clone(this.value)
        let has = false
        let hasIndex = null
        for (let i = 0; i < this.value.length; i++) {
          if (this.value[i] === value) {
            has = true
            hasIndex = i
          }
        }
        if (has) {
          newValues.splice(hasIndex, 1)
        } else {
          newValues.push(value)
        }
      } else {
        newValues.push(value)
      }
      this.$emit('input', newValues)
    },
    handlerSelectedDays (day) {
      if (day === null) {
        this.$emit('input', null)
        return
      }
      let value = day.moment.format(this.format)
      if (this.rangeModel) {
        if (!this.value || this.value.length === 2) {
          this.$emit('input', [value])
        } else {
          let valueClone = utils.clone(this.value)
          valueClone.push(value)
          this.$emit('input', this.adjustDateArrayStartAndEnd(valueClone))
        }
      } else if (this.multipleModel) {
        this.handlerMultipleModelSelected(value)
      } else {
        this.$emit('input', value)
      }
    },
    handlerSelectedYears (yearNumber) {
      if (yearNumber === null) {
        this.$emit('input', null)
        return
      }
      // console.log(yearNumber)
      this.state = this.type
      let currentMoment = null
      if (this.calendarHeaderDate) {
        currentMoment = moment(this.calendarHeaderDate, this.format)
      } else {
        currentMoment = moment()
      }
      this.calendarHeaderDate = currentMoment.year(yearNumber).format(this.format)
      if (this.type === 'years') {
        let currentDate = currentMoment.year(yearNumber).format(this.format)
        if (this.rangeModel) {
          if (!this.value || this.value.length === 2) {
            this.$emit('input', [currentDate])
          } else {
            let valueClone = utils.clone(this.value)
            valueClone.push(currentDate)
            this.$emit('input', this.adjustDateArrayStartAndEnd(valueClone))
          }
        } else if (this.multipleModel) {
          this.handlerMultipleModelSelected(currentDate)
        } else {
          this.$emit('input', currentDate)
        }
      }
    },
    handlerSelectedMonths (monthNumber) {
      if (monthNumber === null) {
        this.$emit('input', null)
        return
      }
      this.state = this.type
      let currentMoment = null
      if (this.calendarHeaderDate) {
        currentMoment = moment(this.calendarHeaderDate, this.format)
      } else {
        currentMoment = moment()
      }
      this.calendarHeaderDate = currentMoment.month(monthNumber).format(this.format)
      if (this.type === 'months') {
        if (this.rangeModel) {
          if (!this.value || this.value.length === 2) {
            this.$emit('input', [this.calendarHeaderDate])
          } else {
            let valueClone = utils.clone(this.value)
            valueClone.push(this.calendarHeaderDate)
            this.$emit('input', this.adjustDateArrayStartAndEnd(valueClone))
          }
        } else if (this.multipleModel) {
          this.handlerMultipleModelSelected(this.calendarHeaderDate)
        } else {
          this.$emit('input', this.calendarHeaderDate)
        }
      }
    },
    handlerWantSelectedMonths () {
      this.state = 'months'
    },
    handlerWantSelectedYears () {
      this.state = 'years'
    }
  },
  components: {
    calendarHeader,
    months,
    days,
    years
  }
}
</script>
<style module lang="scss">
.main{
  color: $color-text-regular;
  // padding-bottom: 5px;
}
</style>
