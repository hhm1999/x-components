### datePicker 日期选择器
日期选择器。

#### 基础用法
``` html
<template>
  <div :class="$style.main">
    <p class="c_title">基础用法</p>
    <x-date-picker placeholder="基础用法" v-model="valueBasis"></x-date-picker>
    <p class="c_title">选择范围</p>
    <x-date-picker-range time range-model v-model="valueRangeModel"></x-date-picker-range>
    <p class="c_title">仅年份选择</p>
    <x-date-picker type="years" v-model="valueYears"></x-date-picker>
    <p class="c_title">年份月份选择</p>
    <x-date-picker type="months" v-model="valueMonths"></x-date-picker>
    <p class="c_title">日期时间</p>
    <x-date-picker time v-model="valueTime"></x-date-picker>
    <p class="c_title">自定义日期格式</p>
    <x-date-picker time format="YYYY年MM月DD日 HH时mm分ss秒" v-model="valueFormat"></x-date-picker>
    <p class="c_title">初始日历日期{{ valueInitDate + '' }}</p>
    <x-date-picker :init-date="initDate" v-model="valueInitDate"></x-date-picker>
    <p class="c_title">禁用</p>
    <x-date-picker disabled v-model="valueDisabled"></x-date-picker>
  </div>
</template>
<script>
export default {
  data () {
    return {
      valueBasis: '2022-12-14',
      valueTime: '2023-12-14 12:11:13',
      valueDisabled: '2030-06-05',
      valueRangeModel: [ '2022-01-01 01:04:30', '2022-02-20 09:12:40' ],
      valueInitDate: undefined,
      valueYears: '2035',
      valueMonths: '2070-06',
      valueFormat: '2021年01月15日 04时05分05秒',
      initDate: '2020-08'
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
```

#### 可选范围限制
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
```

::: warning
通过回调函数的方式禁止选中特定日期时间可能存在性能问题，请尽量精简函数逻辑和优化性能。
:::

#### x-date-picker 和 x-date-picker-range 共有属性
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| v-model    | 日期时间绑定值   |  --  |  --  |  --  |
| time    | 是否可以选择 时分秒  |  boolean  |  --  |  false  |
| init-date  |  日历显示的初始年月份   | string  |   --  |    空值情况下为当前年月份，非空值情况下为值的年月份    |
| type  |  日期的最小单位   | string  |   years / months / days  |    days    |
| format  |  日期格式，参考[momentjs](https://momentjs.com/)   | string  |  --  |    YYYY-MM-DD HH:mm:ss    |
| placeholder  | 输入框提示文字   | string  |   --  |    请选择     |
| disabled     | 是否禁用   | boolean  |   --  |    false     |
| selectable-range | 允许选择的日期范围，格式:['可选日期时间段开始1 ~ 可选日期时间段结束1', '可选日期时间段开始2 ~ 可选日期时间段结束2']  |  array  |  --  |  false  |

#### x-date-picker 独有属性
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| init-date  |  日历显示的初始年月份   | string  |   --  |    空值情况下为当前年月份，非空值情况下为值的年月份    |


#### x-date-picker 和 x-date-picker-range 相同的函数属性
| 参数      | 说明    | 类型      | 回调参数  | 返回要求  |
|---------- |-------- |---------- |-------- | -------- | 
| disabled-day     | 逐个回调确认日期是否可选 |  function(moment) |  `moment`日期的[moment](https://momentjs.com/)对象  | 可选返回`true`，不可选返回`false` | 
| disabled-month     | 逐个回调确认月份是否可选 |  function(moment) |  `moment`日期的[moment](https://momentjs.com/)对象  | 可选返回`true`，不可选返回`false` | 
| disabled-year     | 逐个回调确认年份是否可选 |  function(moment) |  `moment`日期的[moment](https://momentjs.com/)对象  | 可选返回`true`，不可选返回`false` | 

#### x-date-picker 的函数属性
| 参数      | 说明    | 类型      | 回调参数  | 返回要求  |
|---------- |-------- |---------- |-------- | -------- | 
| disabled-hour     | 逐个回调确认小时是否可选</br>仅在`time=true`时可用 |  function(hour, moment) | `hour`目标小时值 </br>`moment`选中日期的[moment](https://momentjs.com/)对象  | 可选返回`true`，不可选返回`false` | 
| disabled-minute     | 逐个回调确认分钟是否可选</br>仅在`time=true`时可用 |  function(minute, hour, moment) |  `minute`目标分钟值</br>`hour`当前选中小时值</br>`moment`选中日期的[moment](https://momentjs.com/)对象  | 可选返回`true`，不可选返回`false` | 
| disabled-second     | 逐个回调确认秒是否可选</br>仅在`time=true`时可用 |  function(second, minute, hour, moment) |  `minute`目标秒值</br>`minute`当前选中分钟值</br>`hour`当前选中小时值</br>`moment`选中日期的[moment](https://momentjs.com/)对象  | 可选返回`true`，不可选返回`false` | 

#### x-date-picker-range 的函数属性
| 参数      | 说明    | 类型      | 回调参数  | 返回要求  |
|---------- |-------- |---------- |-------- | -------- | 
| disabled-hour     | 逐个回调确认小时是否可选</br>仅在`time=true`时可用 |  function(hour, [momentStart, momentEnd], type) | `hour`目标小时值 </br>`momentStart`选中开始日期的[moment](https://momentjs.com/)对象</br>`momentEnd`选中结束日期的[moment](https://momentjs.com/)对象</br>`type` start\|end 是开始(start)还是结束(end)时间  | 可选返回`true`</br>不可选返回`false` | 
| disabled-minute     | 逐个回调确认分钟是否可选</br>仅在`time=true`时可用 |  function(minute, hour, [momentStart, momentEnd], type) |  `minute`目标分钟值</br>`hour`当前选中小时值</br>`momentStart`选中开始日期的[moment](https://momentjs.com/)对象</br>`momentEnd`选中结束日期的[moment](https://momentjs.com/)对象</br>`type` start\|end 是开始(start)还是结束(end)时间  | 可选返回`true`</br>不可选返回`false` | 
| disabled-second     | 逐个回调确认秒是否可选</br>仅在`time=true`时可用 |  function(second, minute, hour, [momentStart, momentEnd], type) |  `minute`目标秒值</br>`minute`当前选中分钟值</br>`hour`当前选中小时值</br>`momentStart`选中开始日期的[moment](https://momentjs.com/)对象</br>`momentEnd`选中结束日期的[moment](https://momentjs.com/)对象</br>`type` start\|end 是开始(start)还是结束(end)时间  | 可选返回`true`</br>不可选返回`false` | 