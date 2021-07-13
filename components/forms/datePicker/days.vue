<template>
  <div :class="classMain">
    <weeksHeader :size="size"></weeksHeader>
    <div :class="$style.day_wrap">
      <div
        v-for="week in weeks"
        :class="getWeekClass()"
        :key="week[0].year+'-'+week[0].month+'-'+week[0].day+dateKey"
      >
        <div
          v-for="day in week"
          @click="handlerDayClick(day)"
          :class="getDayClass(day)"
          :style="getDayStyle(day)"
          :key="day.year+'-'+day.month+'-'+day.day+dateKey"
        >
          <div :style="styleDayNumber" :class="$style.number">
            {{ day.day }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as moment from 'moment'
import weeksHeader from './weeksHeader.vue'
export default {
  props: {
    headerDate: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'day'
    },
    date: {
      type: [String, Array],
      default: null
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    displaySelected: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: undefined
    },
    disabledDay: {
      type: Function,
      default: undefined
    },
    onlyShowCurrentMonth: {
      type: Boolean,
      default: false
    },
    disabledEmpty: { // 原本选中不可选的日期将触发input事件将数据置空为null
      type: Boolean,
      default: true
    },
    rangeModel: {
      type: Boolean,
      default: undefined
    }
  },
  data () {
    return {
      weeks: [],
      days: null,
      noChangeWeeks: false
    }
  },
  created () {
    this.open_updateData()
  },
  mounted () {
  },
  watch: {
    date: 'open_updateData',
    headerDate: 'open_updateData'
  },
  computed: {
    dateKey () {
      if (this.date) {
        return this.date.toString()
      } else {
        return ''
      }
    },
    // styleDay () {
    //   return {
    //     height: this.size + 'px',
    //     lineHeight: this.size + 'px'
    //   }
    // },
    styleDayNumber () {
      return {
        width: this.size - 5 + 'px',
        height: this.size - 5 + 'px',
        lineHeight: this.size - 5 + 'px',
        borderRadius: (this.size - 5) / 2 + 'px',
      }
    },
    classMain () {
      return {
        [this.$style.main]: true,
        // [this.$style.type_day]: this.type === 'day',
        [this.$style.type_week]: this.type === 'week'
      }
    },
    momentDate () {
      if (this.date) {
        if (Array.isArray(this.date)) {
          let momentArray = []
          for (let i = 0; i < this.date.length; i++) {
            momentArray.push(moment(this.date[i], this.format))
          }
          return momentArray
        } else {
          return moment(this.date, this.format)
        }
      }
      return null
    }
  },
  methods: {
    open_updateData () {
      let weeks = this.getMonthDay(moment(this.headerDate, this.format))
      if (this.weeks) {
        this.weeks.splice(0, this.weeks)
      }
      this.weeks = weeks
    },
    handlerDayClick (day) {
      this.noChangeWeeks = true
      if (!day.disabled) {
        this.$emit('selected', day)
      }
    },
    getWeekClass () {
      return {
        [this.$style.week]: true
      }
    },
    getDayState (day) {
      const disabled = day.disabled
      let selected = false
      let scopeInclude = false
      let scopeStart = false
      let scopeEnd = false
      if (this.displaySelected && this.date) {
        if (Array.isArray(this.date)) {
          for (let i = 0; i < this.date.length; i++) {
            if (day.moment.isSame(this.momentDate[i], 'day')) {
              selected = true
              break
            }
          }
          if (this.rangeModel) {
            if (this.date.length === 2) {
              if (day.moment.isBefore(this.momentDate[1], 'day') && day.moment.isAfter(this.momentDate[0], 'day')) {
                scopeInclude = true
              } else {
                if (day.moment.isSame(this.momentDate[0], 'day')) {
                  scopeStart = true
                }
                if (day.moment.isSame(this.momentDate[1], 'day')) {
                  scopeEnd = true
                }
              }
            }
          }
        } else {
          selected = day.moment.isSame(this.momentDate, 'day')
        }
      }
      return {
        disabled: disabled,
        selected: selected,
        scopeInclude: scopeInclude,
        scopeStart: scopeStart,
        scopeEnd: scopeEnd
      }
    },
    getDayStyle (day) {
      const dayState = this.getDayState(day)
      let style = {
        height: this.size + 'px',
        lineHeight: this.size + 'px'
      }
      if (dayState.scopeStart) {
        style['border-top-left-radius'] = this.size / 2 + 'px'
        style['border-bottom-left-radius'] = this.size / 2 + 'px'
      }
      if (dayState.scopeEnd) {
        style['border-top-right-radius'] = this.size / 2 + 'px'
        style['border-bottom-right-radius'] = this.size / 2 + 'px'
      }
      return style
    },
    getDayClass (day) {
      const dayState = this.getDayState(day)
      if (dayState.selected && dayState.disabled && this.disabledEmpty) {
        this.$nextTick(() => {
          this.$emit('selected', null)
        })
      }
      return {
        // [this.$style.small]: this.size === 'small',
        [this.$style.day]: true,
        [this.$style.last_month]: day.isLastMonth,
        [this.$style.next_month]: day.isNextMonth,
        [this.$style.visibility_hide]: (day.isNextMonth || day.isLastMonth) && this.onlyShowCurrentMonth,
        [this.$style.is_today]: day.isToday,
        [this.$style.disabled]: dayState.disabled,
        [this.$style.is_selected]: dayState.selected,
        [this.$style.scope_include]: dayState.scopeInclude,
        [this.$style.scope_start]: dayState.scopeStart,
        [this.$style.scope_end]: dayState.scopeEnd,
        [this.$style.hover]: !dayState.disabled && !dayState.selected
      }
    },
    getMonthDay (date) {
      const daysArr = [[], [], [], [], [], []] // 6*7的日历数组
      const currentWeekday = moment(date).date(1).weekday() // 获取当月1日为星期几
      const lastMonth = moment(date).subtract(1, 'month')
      const lastMonthDays = lastMonth.daysInMonth() // 获取上月天数
      const currentMonthDays = moment(date).daysInMonth() // 获取当月天数
      const thisMonth = moment(date)
      const nextMonth = moment(date).add(1, 'month')
      const thisMonthData = {
        month: thisMonth.month() + 1,
        year: thisMonth.year()
      }
      const lastMonthData = {
        month: lastMonth.month() + 1,
        year: lastMonth.year()
      }
      const nextMonthData = {
        month: nextMonth.month() + 1,
        year: nextMonth.year()
      }
      for (let i = 0; i < 7; i += 1) {
        let virtualDay = (lastMonthDays - currentWeekday) + i + 1
        for (let j = 0; j < 6; j += 1) {
          daysArr[j][i] = this.getDay(
            virtualDay + (j * 7),
            currentMonthDays,
            lastMonthDays,
            thisMonthData,
            lastMonthData,
            nextMonthData
          )
        }
      }
      return daysArr
    },
    getDay (day, currentMonthDays, lastMonthDays, thisMonthData, lastMonthData, nextMonthData) {
      let dayObj = null
      if (day <= lastMonthDays) { // 上个月的日期
        dayObj = {
          label: day,
          day: day,
          month: lastMonthData.month,
          year: lastMonthData.year,
          isLastMonth: true
        }
      } else if (day <= (lastMonthDays + currentMonthDays)) { // 这个月的日期
        dayObj = {
          label: day - lastMonthDays,
          day: day - lastMonthDays,
          month: thisMonthData.month,
          year: thisMonthData.year,
          isThisMonth: true
        }
      } else {
        dayObj = {
          label: day - (lastMonthDays + currentMonthDays), // 下个月的日期
          day: day - (lastMonthDays + currentMonthDays),
          month: nextMonthData.month,
          year: nextMonthData.year,
          isNextMonth: true
        }
      }
      dayObj.moment = moment({
        y: dayObj.year,
        M: dayObj.month - 1,
        d: dayObj.day
      })
      // console.log(this.disabledDay(dayObj.moment));
      dayObj.disabled = typeof this.disabledDay === 'function' && this.disabledDay(dayObj.moment)
      dayObj.isToday = dayObj.moment.isSame(moment(), 'day')
      return dayObj
    }
  },
  components: {
    weeksHeader
  }
}
</script>
<style module lang="scss">
.main{
  &.type_week{
    .week{
      &:hover{
        background-color: $color-primary-extra-light;
        .number {
          color: $color-primary;
        }
      }
    }
  }
  .week{
    border-radius: 20px;
  }
  .day_wrap{
    padding: 5px;
    box-sizing: border-box;
    .day{
      width: 14.2%;
      // height: 40px;
      // line-height: 40px;
      text-align: center;
      display: inline-block;
      font-size: 12px;
      cursor: pointer;
      &.scope_include{
        background-color: $color-primary-extra-light;
      }
      &.scope_start{
        background-color: $color-primary-extra-light;
        // border-top-left-radius: 50%;
        // border-bottom-left-radius: 50%;
      }
      &.scope_end{
        background-color: $color-primary-extra-light;
        // border-top-right-radius: 50%;
        // border-bottom-right-radius: 50%;
      }
      // &.small{
      //   height: 35px;
      //   line-height: 35px;
      // }
      &.visibility_hide{
        visibility: hidden;
      }
      &.last_month{
        color: $color-text-placeholder;
      }
      &.next_month{
        color: $color-text-placeholder;
      }
      &.disabled{
        .number{
          color: $color-text-placeholder;
          background-color: inherit;
          cursor:not-allowed;
        }
      }
      &.is_today{
        .number{
          color: $color-primary;
          font-weight: $bold-weight;
        }
      }
      &.is_selected{
        .number{
          background-color: $color-primary;
          color: $color-white;
        }
      }
      &.hover{
        .number{
          &:hover{
            background-color: $color-primary-extra-light;
            color: $color-primary;
          }
        }
      }
      .number{
        // width: 30px;
        // height: 30px;
        // line-height: 30px;
        display: inline-block;
        // border-radius: 15px;
      }
    }
  }
}

</style>
