<template>
  <div :class="$style.main">
    <div
      v-for="month in months"
      :class="getMonthClass(month)"
      :key="month.month"
    >
      <div @click="handlerNumberClick(month)" :class="$style.number">
        {{ month.label }}
      </div>
    </div>
  </div>
</template>
<script>
import * as moment from 'moment'
export default {
  props: {
    date: {
      type: [String, Array],
      default: null
    },
    headerDate: {
      type: String,
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
    disabledMonth: {
      type: Function,
      default: undefined
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
      months: null
    }
  },
  created () {
  },
  mounted () {
  },
  watch: {
    date () {
      this.open_updateData()
    },
    headerDate: {
      handler () {
        this.$nextTick(this.open_updateData)
      },
      immediate: true
    }
  },
  computed: {
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
    },
    momentHeaderDate () {
      if (this.headerDate) {
        return moment(this.headerDate, this.format)
      }
      return null
    }
  },
  methods: {
    open_updateData () {
      if (Array.isArray(this.months)) {
        this.months.splice(0, this.months.length)
      }
      this.months = this.getMonths()
    },
    isThisMonth (monthNumber) {
      if (this.headerDate) {
        const dateMoment = moment()
        if (dateMoment.isSame(moment(this.headerDate, this.format), 'year') && dateMoment.get('month') === monthNumber) {
          return true
        }
      }
      return false
    },
    isDisabled (month) {
      if (typeof this.disabledMonth === 'function') {
        let newMoment = moment(this.headerDate, this.format)
        newMoment.set('month', month)
        return this.disabledMonth(newMoment)
      }
      return false
    },
    isScopeInclude (monthMoment) {
      if (this.rangeModel && this.date && this.headerDate && Array.isArray(this.date) && this.date.length === 2) {
        if (monthMoment.isBefore(this.momentDate[1]) && monthMoment.isAfter(this.momentDate[0])) {
          return true
        }
      }
      return false
    },
    isScopeStart (monthMoment) {
      if (this.rangeModel && this.date && Array.isArray(this.date) && this.date.length === 2 && monthMoment.isSame(this.momentDate[0])) {
        return true
      }
    },
    isScopeEnd (monthMoment) {
      if (this.rangeModel && this.date && Array.isArray(this.date) && this.date.length === 2 && monthMoment.isSame(this.momentDate[1])) {
        return true
      }
    },
    isSelected (monthNumber) {
      if (this.date && this.headerDate) {
        if (Array.isArray(this.date)) {
          for (let i = 0; i < this.date.length; i++) {
            if (this.getIsSelectedOne(this.momentDate[i], monthNumber)) {
              return true
            }
          }
        } else {
          return this.getIsSelectedOne(moment(this.date, this.format), monthNumber)
        }
      }
      return false
    },
    getIsSelectedOne (dateMoment, monthNumber) {
      // console.log(dateMoment, monthNumber, this.headerDate)
      if (dateMoment.isSame(moment(this.headerDate, this.format), 'year') && dateMoment.get('month') === monthNumber) {
        return true
      }
      return false
    },
    handlerNumberClick (month) {
      !month.disabled && this.$emit('selected', month.month)
    },
    getMonthClass (month) {
      const selected = month.selected
      const disabled = month.disabled
      const scopeInclude = month.scopeInclude
      if (selected && disabled && this.disabledEmpty) {
        this.$nextTick(() => {
          this.$emit('selected', null)
        })
      }
      return {
        [this.$style.month]: true,
        [this.$style.is_this_month]: month.thisMonth,
        [this.$style.is_selected]: selected,
        [this.$style.scope_include]: scopeInclude,
        [this.$style.scope_start]: month.isScopeStart,
        [this.$style.scope_end]: month.isScopeEnd,
        [this.$style.disabled]: disabled,
        [this.$style.hover]: !disabled && !selected
      }
    },
    getMonths () {
      let months = []
      for (let i = 0; i < 12; i++) {
        let monthMoment = moment(this.headerDate).set('month', i)
        let isSelected = this.isSelected(i)
        months[i] = {
          label: (i + 1) + '月',
          month: i,
          moment: monthMoment,
          thisMonth: this.isThisMonth(i),
          disabled: this.isDisabled(i),
          selected: isSelected,
          scopeInclude: this.isScopeInclude(monthMoment),
          isScopeStart: isSelected && this.isScopeStart(monthMoment),
          isScopeEnd: isSelected && this.isScopeEnd(monthMoment)
        }
      }
      return months
    }
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  padding: 10px;
  box-sizing: border-box;
  border-top: 1px solid $border-color-lighter;
  .month{
    font-size: 12px;
    width: 25%;
    // margin: 10px 0px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    display: inline-block;
    &.scope_include{
      background-color: $color-primary-extra-light;
    }
    &.scope_start{
      background-color: $color-primary-extra-light;
      border-top-left-radius: 30px;
      border-bottom-left-radius: 30px;
    }
    &.scope_end{
      background-color: $color-primary-extra-light;
      border-top-right-radius: 30px;
      border-bottom-right-radius: 30px;
    }
    &.disabled{
      .number{
        color: $color-text-placeholder;
        cursor: not-allowed;
        background-color: inherit;
      }
    }
    &.is_this_month{
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
      cursor: pointer;
      display: inline-block;
      width: 36px;
      height: 36px;
      line-height: 36px;
      border-radius: 18px;
    }
  }
}
</style>
