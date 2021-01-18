<template>
  <div :style="styleMain" :class="classMain">
    <x-icon
      v-if="!hidePrevYear"
      @click.native="handlerClickPrevYear"
      :style="[styleArrow, styleArrowLeftDouble]"
      :class="$style.arrow_left_double"
      type="forms-calendar-arrow-left-double"
    >
    </x-icon>
    <x-icon
      v-if="!hidePrevMonth"
      v-show="state==='days'"
      @click.native="handlerClickPrevMonth"
      :style="[styleArrow, styleArrowLeftSingle]"
      :class="$style.arrow_left_single"
      type="forms-calendar-arrow-left-single"
    >
    </x-icon>
    <div :class="$style.years_months">
      <span :class="$style.years" v-show="state!=='years'" @click="$emit('wantSelectedYears')">{{ year }}年</span>
      <span :class="$style.years" v-show="state==='years'" @click="$emit('wantSelectedYears')">{{ (year) + '年 - ' + (year + 11) + '年' }}</span>
      <span :class="$style.months" v-show="state==='days'" @click="$emit('wantSelectedMonths')">{{ month }}月</span>
    </div>
    <x-icon
      v-if="!hideNextMonth"
      v-show="state==='days'"
      @click.native="handlerClickNextMonth"
      :style="[styleArrow, styleArrowRightSingle]"
      :class="$style.arrow_right_single"
      type="forms-calendar-arrow-right-single"
    >
    </x-icon>
    <x-icon
      v-if="!hideNextYear"
      @click.native="handlerClickNextYear"
      :style="[styleArrow, styleArrowRightDouble]"
      :class="$style.arrow_right_double"
      type="forms-calendar-arrow-right-double"
    >
    </x-icon>
  </div>
</template>
<script>
import * as moment from 'moment'
export default {
  props: {
    date: {
      type: String,
      default: null
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    state: {
      type: String,
      default: 'days'
    },
    size: {
      type: Number,
      default: undefined
    },
    hidePrevYear: {
      type: Boolean,
      default: undefined
    },
    hideNextYear: {
      type: Boolean,
      default: undefined
    },
    hidePrevMonth: {
      type: Boolean,
      default: undefined
    },
    hideNextMonth: {
      type: Boolean,
      default: undefined
    }
  },
  data () {
    return {
      dateInternal: null
    }
  },
  created () {
  },
  mounted () {
  },
  watch: {
    date: {
      handler (val) {
        this.dateInternal = val
      },
      immediate: true
    }
  },
  computed: {
    year () {
      return this.getData('year')
    },
    month () {
      return this.getData('month') + 1
    },
    classMain () {
      return {
        [this.$style.main]: true
      }
    },
    styleMain () {
      return {
        height: this.size + 'px',
        lineHeight: this.size + 'px'
      }
    },
    styleArrowLeftDouble () {
      return {
        left: this.size / 4 + 'px'
      }
    },
    styleArrowLeftSingle () {
      return {
        left: this.size / 4 + this.size + 'px'
      }
    },
    styleArrowRightDouble () {
      return {
        right: this.size / 4 + 'px'
      }
    },
    styleArrowRightSingle () {
      return {
        right: this.size / 4 + this.size + 'px'
      }
    },
    styleArrow () {
      return {
        width: this.size + 'px',
        height: this.size + 'px',
        lineHeight: this.size + 'px'
      }
    }
  },
  methods: {
    handlerClickPrevYear () {
      this.$emit('prevYear')
    },
    handlerClickNextYear () {
      this.$emit('nextYear')
    },
    handlerClickPrevMonth () {
      this.$emit('prevMonth')
    },
    handlerClickNextMonth () {
      this.$emit('nextMonth')
    },
    getData (type) {
      let theMoment = null
      if (this.dateInternal) {
        theMoment = moment(this.dateInternal, this.format)
      } else {
        theMoment = moment()
      }
      return theMoment.get(type)
    }
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  position: relative;
  font-size: 14px;
  .arrow_left_double,
  .arrow_left_single,
  .arrow_right_single,
  .arrow_right_double{
    color: $color-text-secondary;
    position: absolute;
    top: 0px;
    width: 35px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
    &:hover{
      color: $color-primary;
    }
  }
  .arrow_left_double{
    left: 0px;
  }
  .arrow_left_single{
    left: 30px;
  }
  .arrow_right_single{
    right: 30px;
  }
  .arrow_right_double{
    right: 0px;
  }
  .years_months{
    text-align: center;
    font-weight: $bold-weight;
    .years{
      cursor: pointer;
      margin-right: 5px;
      &:hover{
        color: $color-primary;
      }
    }
    .months{
      cursor: pointer;
      &:hover{
        color: $color-primary;
      }
    }
  }
}
</style>
