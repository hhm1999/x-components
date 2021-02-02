<template>
  <div :class="$style.main">
    <p class="c_title">自定义可选范围</p>
    <x-time-picker :selectable-range="['11:12:13 - 14:15:16']" v-model="valueSelectableRange"></x-time-picker>
    <p class="c_title">通过回调函数禁止选中特定日期时间</p>
    <x-time-picker
      :disabled-hour="disabledHour"
      :disabled-minute="disabledMinute"
      :disabled-second="disabledSecond"
      v-model="valueDisabledCallback"
    >
    </x-time-picker>
    <p class="c_title">通过回调函数禁止选中特定日期时间-日期范围版</p>
    <x-time-picker-range
      :disabled-hour="disabledHourRange"
      :disabled-minute="disabledMinuteRange"
      :disabled-second="disabledSecondRange"
      v-model="valueDisabledCallbackRange"
    >
    </x-time-picker-range>
  </div>
</template>
<script>
export default {
  props: {
  },
  data () {
    return {
      valueSelectableRange: '13:02:17',
      valueDisabledCallback: '08:11:20',
      valueDisabledCallbackRange: [ '08:11:20', '18:19:20' ]
    }
  },
  methods: {
    disabledHour (hour) {
      if (hour > 8) { // 大于8点不可选
        return true
      }
      return false
    },
    disabledMinute (minute, hour) {
      if (hour === 8 && minute > 11) { // 大于8点11分不可选
        return true
      }
      return false
    },
    disabledSecond (second, hour, minute) {
      if (hour === 8 && minute === 11 && second > 20) { // 大于8点11分20秒不可选
        return true
      }
      return false
    },
    disabledHourRange (hour, type) {
      if (type === 'start' && hour < 8) { // 开始时间小于8点不可选
        return true
      }
      if (type === 'end' && hour > 18) { // 结束时间小大于18点不可选
        return true
      }
      return false
    },
    disabledMinuteRange (minute, hour, type) {
      if (type === 'start' && hour === 8 && minute < 11) { // 开始时间小于8点11分不可选
        return true
      }
      if (type === 'end' && hour === 18 && minute > 19) { // 结束时间小大于18点19分不可选
        return true
      }
      return false
    },
    disabledSecondRange (second, hour, minute, type) {
      if (type === 'start' && hour === 8 && minute === 11 && second < 20) { // 开始时间小于8点11分20秒不可选
        return true
      }
      if (type === 'end' && hour === 18 && minute === 19 && second > 20) { // 结束时间小大于18点19分20秒不可选
        return true
      }
      return false
    }
  }
 
}
</script>
<style module lang="scss">
.main{
  width: 300px;
  .title{
    font-size: 14px;
    margin: 20px 0 10px 0;
    &:first-child{
      margin-top: 0px;
    }
  }
}
</style>