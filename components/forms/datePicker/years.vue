<template>
  <div :class="classMain">
    <div
      v-for="year in years"
      :class="getYearClass(year)"
      :key="year.year"
    >
      <div @click="handlerNumberClick(year)" :class="$style.number">
        {{ year.label }}
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
    disabledYear: {
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
      render: true,
      years: null,
      startYear: null
    }
  },
  created () {
    // this.open_updateData()
  },
  mounted () {
  },
  watch: {
    headerDate: {
      handler () {
        // if (this.startYear && ) {
        //
        // }
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
    },
    classMain () {
      return {
        [this.$style.main]: true
      }
    }
  },
  methods: {
    open_updateData () {
      if (Array.isArray(this.years)) {
        this.years.splice(0, this.years.length)
      }
      this.years = this.getYears()
    },
    isThisYear (yearNumber) {
      return moment().get('year') === yearNumber
    },
    isSelected (yearNumber) {
      if (this.date) {
        if (Array.isArray(this.date)) {
          for (let i = 0; i < this.momentDate.length; i++) {
            if (this.momentDate[i].get('year') === yearNumber) {
              return true
            }
          }
        } else {
          return this.momentDate.get('year') === yearNumber
        }
      }
      return false
    },
    isScopeInclude (yearMoment) {
      if (this.rangeModel && this.date && this.headerDate && Array.isArray(this.date) && this.date.length === 2) {
        if (yearMoment.isBefore(this.momentDate[1]) && yearMoment.isAfter(this.momentDate[0])) {
          return true
        }
      }
      return false
    },
    isScopeStart (yearMoment) {
      if (this.rangeModel && this.date && Array.isArray(this.date) && this.date.length === 2 && yearMoment.isSame(this.momentDate[0])) {
        return true
      }
      return false
    },
    isScopeEnd (yearMoment) {
      if (this.rangeModel && this.date && Array.isArray(this.date) && this.date.length === 2 && yearMoment.isSame(this.momentDate[1])) {
        return true
      }
      return false
    },
    handlerNumberClick (year) {
      !year.disabled && this.$emit('selected', year.year)
    },
    getYearClass (year) {
      const disabled = year.disabled
      const selected = this.isSelected(year.year)
      let scopeInclude = this.isScopeInclude(year.moment)
      if ((selected || scopeInclude) && disabled && this.disabledEmpty) {
        this.$nextTick(() => {
          this.$emit('selected', null)
        })
      }
      return {
        [this.$style.year]: true,
        [this.$style.is_this_year]: this.isThisYear(year.year),
        [this.$style.is_selected]: selected,
        [this.$style.scope_include]: scopeInclude,
        [this.$style.scope_start]: this.isScopeStart(year.moment),
        [this.$style.scope_end]: this.isScopeEnd(year.moment),
        [this.$style.disabled]: disabled,
        [this.$style.hover]: !disabled && !selected
      }
    },
    isDisabled (year) {
      if (typeof this.disabledYear === 'function') {
        let newMoment = moment(year, this.format)
        return this.disabledYear(newMoment)
      }
      return false
    },
    getYears () {
      this.startYear = moment(this.headerDate, this.format)
      const startYearNumber = this.startYear.get('year')
      let years = []
      for (let i = 0; i < 12; i++) {
        const yearMoment = moment(startYearNumber + i, this.format)
        years[i] = {
          moment: yearMoment,
          label: startYearNumber + i,
          year: startYearNumber + i,
          disabled: this.isDisabled(startYearNumber + i)
        }
      }
      return years
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
  .year{
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
        cursor:not-allowed;
        background-color: inherit;
      }
    }
    &.is_this_year{
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
