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
      valueInitDate: '2030-06-05',
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