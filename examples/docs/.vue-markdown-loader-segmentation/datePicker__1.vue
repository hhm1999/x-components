``` html
<template>
  <div :class="$style.main">
    <p class="c_title">自定义可选范围</p>
    <x-date-picker
      time
      :selectable-range="['2021-01-01 11:12:13 ~ 2021-03-03 14:15:16']"
      v-model="valueSelectableRange"
    >
    </x-date-picker>
    <p class="c_title">通过回调函数禁止选中特定日期时间</p>
    <x-date-picker
      time
      :disabled-day="disabledDay"
      :disabled-month="disabledMonth"
      :disabled-year="disabledYear"
      :disabled-hour="disabledHour"
      :disabled-minute="disabledMinute"
      :disabled-second="disabledSecond"
      v-model="valueDisabledCallback"
    >
    </x-date-picker>
    <p class="c_title">通过回调函数禁止选中特定日期时间-日期范围版</p>
    <x-date-picker-range
      time
      :disabled-day="disabledDayRange"
      :disabled-hour="disabledHourRange"
      :disabled-minute="disabledMinuteRange"
      :disabled-second="disabledSecondRange"
      v-model="valueDisabledCallbackRange"
    >
    </x-date-picker-range>
  </div>
</template>
<script>
export default {
  data () {
    return {
      valueSelectableRange: '2021-03-03 10:22:05',
      valueDisabledCallback: '2021-04-14 10:15:25',
      valueDisabledCallbackRange: [ '2021-01-02 10:20:25', '2021-01-05 12:22:30' ]
    }
  },
  methods: {
    disabledYear (moment) {
      // 2022年不可选
      if (moment && moment.isSame('2022', 'year')) {
        return true
      } else {
        return false
      }
    },
    disabledMonth (moment) {
      // 2021年12月不可选
      if (moment && moment.isSame('2021-12', 'month')) {
        return true
      } else {
        return false
      }
    },
    disabledDay (moment) {
      if (moment.day() === 0 || moment.day() === 6) { // 周末不可选
        return true
      } else {
        return false
      }
    },
    disabledHour (hour, selectedMoment) {
      // 2021-02-02 10点以后的时间不可选
      if (selectedMoment && selectedMoment.isAfter('2021-02-01') && hour > 10) {
        return true
      } else {
        return false
      }
    },
    disabledMinute (minute, hour, selectedMoment) {
      // 2021-02-02 10点20分以后的时间不可选
      if (selectedMoment && selectedMoment.isAfter('2021-02-01') && hour >= 10 && minute > 20) {
        return true
      } else {
        return false
      }
    },
    disabledSecond (second, hour, minute, selectedMoment) {
      // 2021-02-02 10点20分30秒以后的时间不可选
      if (selectedMoment && selectedMoment.isAfter('2021-02-01') && hour >= 10 && minute >= 20 && second > 30) {
        return true
      } else {
        return false
      }
    },
    disabledDayRange (moment) {
      if (moment.isBefore('2021-01-02') || moment.isAfter('2021-01-05')) { // 2021-02-01之前不可选
        return true
      } else {
        return false
      }
    },
    disabledHourRange (hour, selectedMoments, type) {
      if (selectedMoments && selectedMoments.length === 2) {
        // 配合 disabledDayRange 设定 2021年02月02日 10点 前不可选
        if (type === 'start' && selectedMoments[0].isSame('2021-01-02', 'day') && hour < 10) { 
          return true
        }
        // 配合 disabledDayRange 设定 2021年02月05日 12点 后不可选
        if (type === 'end' && selectedMoments[1].isSame('2021-01-05', 'day') && hour > 12) {
          return true
        }
      }
      return false
    },
    disabledMinuteRange (minute, hour, selectedMoments, type) {
      if (selectedMoments && selectedMoments.length === 2) {
        // 配合 disabledDayRange 设定 2021年02月02日 10点20分 前不可选
        if (type === 'start' && selectedMoments[0].isSame('2021-01-02', 'day') && hour === 10 && minute < 20) { 
          return true
        }
        // 配合 disabledDayRange 设定 2021年02月05日 12点22分 后不可选
        if (type === 'end' && selectedMoments[1].isSame('2021-01-05', 'day') && hour === 12 && minute > 22) {
          return true
        }
      }
      return false
    },
    disabledSecondRange (second, hour, minute, selectedMoments, type) {
      if (selectedMoments && selectedMoments.length === 2) {
        // 配合 disabledDayRange 设定 2021年02月02日 10点20分25秒 前不可选
        if (
          type === 'start' 
          && selectedMoments[0].isSame('2021-01-02', 'day') 
          && hour === 10 
          && minute === 20
          && second < 25
        ) { 
          return true
        }
        // 配合 disabledDayRange 设定 2021年02月05日 12点22分30秒 后不可选
        if (
          type === 'end' 
          && selectedMoments[1].isSame('2021-01-05', 'day') 
          && hour === 12 
          && minute === 22
          && second > 30
        ) {
          return true
        }
      }
      return false
    }
  }
}
</script>
<style module lang="scss">
.main{
  width: 400px;
}
@media screen and (max-width: 900px){
  .main{
    width: 100%;
  }
}
</style>