### timePicker 时间选择器
时间选择器。

#### 基础用法
``` html
<template>
  <div :class="$style.main">
    <p class="c_title">基础用法</p>
    <x-time-picker placeholder="基础用法" v-model="valueBasis"></x-time-picker>
    <p class="c_title">时间范围</p>
    <x-time-picker-range v-model="valuerRange"></x-time-picker-range>
    <p class="c_title">自定义日期格式</p>
    <x-time-picker format="HH时mm分ss秒" v-model="valueFormat"></x-time-picker>
    <p class="c_title">自定义步长</p>
    <x-time-picker :step-hours="2" :step-minutes="4" :step-seconds="6" v-model="valueStep"></x-time-picker>
    <p class="c_title">禁用</p>
    <x-time-picker disabled v-model="valueDisabled"></x-time-picker>
  </div>
</template>
<script>
export default {
  props: {
  },
  data () {
    return {
      valueBasis: '12:30:40',
      valueFormat: '02时20分30秒',
      valueDisabled: '12:30:40',
      valueStep: '02:04:06',
      valuerRange: [ '00:02:02', '04:02:03' ]
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
```

#### 可选范围限制
``` html
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
```
::: warning
通过回调函数的方式禁止选中特定日期时间可能存在性能问题，请尽量精简函数逻辑和优化性能。
:::
#### x-time-picker 和 x-time-picker-range 共有属性
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| v-model    | 日期时间绑定值   |  --  |  --  |  --  |
| type  |  日期的最小单位   | string  |   years / months / days  |    days    |
| format  |  日期格式，参考[momentjs](https://momentjs.com/)   | string  |  --  |    YYYY-MM-DD HH:mm:ss    |
| placeholder  | 输入框提示文字   | string  |   --  |    请选择     |
| disabled     | 是否禁用   | boolean  |   --  |    false     |
| selectable-range | 允许选择的日期范围，格式:['可选日期时间段开始1 ~ 可选日期时间段结束1', '可选日期时间段开始2 ~ 可选日期时间段结束2']  |  array  |  --  |  false  |

#### x-time-picker 属性
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| selectable-range | 允许选择的日期范围，格式:['可选日期时间段开始1 ~ 可选日期时间段结束1', '可选日期时间段开始2 ~ 可选日期时间段结束2']  |  array  |  --  |  false  |

#### x-time-picker-range 属性
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| selectable-range-start | 允许选择的开始日期范围，格式:['可选日期时间段开始1 ~ 可选日期时间段结束1', '可选日期时间段开始2 ~ 可选日期时间段结束2']  |  array  |  --  |  false  |
| selectable-range-end | 允许选择的结束日期范围，格式:['可选日期时间段开始1 ~ 可选日期时间段结束1', '可选日期时间段开始2 ~ 可选日期时间段结束2']  |  array  |  --  |  false  |

#### x-time-picker 的函数属性
| 参数      | 说明    | 类型      | 回调参数  | 返回要求  |
|---------- |-------- |---------- |-------- | -------- | 
| disabled-hour     | 逐个回调确认小时是否可选 |  function(hour) | `hour`目标小时值  | 可选返回`true`，不可选返回`false` | 
| disabled-minute     | 逐个回调确认分钟是否可选 |  function(minute, hour) |  `minute`目标分钟值</br>`hour`当前选中小时值  | 可选返回`true`，不可选返回`false` | 
| disabled-second     | 逐个回调确认秒是否可选 |  function(second, minute, hour) |  `minute`目标秒值</br>`minute`当前选中分钟值</br>`hour`当前选中小时值  | 可选返回`true`，不可选返回`false` | 

#### x-time-picker-range 的函数属性
| 参数      | 说明    | 类型      | 回调参数  | 返回要求  |
|---------- |-------- |---------- |-------- | -------- | 
| disabled-hour     | 逐个回调确认小时是否可选 |  function(hour, type) | `hour`目标小时值</br>`type` start\|end 是开始(start)还是结束(end)时间  | 可选返回`true`，不可选返回`false` | 
| disabled-minute     | 逐个回调确认分钟是否可选 |  function(minute, hour, type) |  `minute`目标分钟值</br>`hour`当前选中小时值</br>`type` start\|end 是开始(start)还是结束(end)时间  | 可选返回`true`，不可选返回`false` | 
| disabled-second     | 逐个回调确认秒是否可选 |  function(second, minute, hour, type) |  `minute`目标秒值</br>`minute`当前选中分钟值</br>`hour`当前选中小时值</br>`type` start\|end 是开始(start)还是结束(end)时间  | 可选返回`true`，不可选返回`false` | 
