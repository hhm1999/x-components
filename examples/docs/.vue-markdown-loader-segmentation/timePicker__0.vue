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