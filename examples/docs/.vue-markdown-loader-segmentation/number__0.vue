<template>
  <div>
    <p class="c_title">基础用法</p>
    <x-number :hasSlider="true" placeholder="请输入" v-model="valueBasis"></x-number>
    <p class="c_title">精度设置</p>
    <x-number :precision="3" v-model="valuePrecision"></x-number>
    <p class="c_title">步长设置</p>
    <x-number :step="2" v-model="valueStep"></x-number>
    <p class="c_title">范围限制</p>
    <x-number :min="-4" :max="4" v-model="valueLimit"></x-number>
    <p class="c_title">禁用</p>
    <x-number disabled v-model="valueDisabled"></x-number>
  </div>
</template>
<script>
export default {
  data () {
    return {
      valueBasis: 0,
      valuePrecision: 1,
      valueStep: 520,
      valueLimit: 0,
      valueDisabled: 24,
    }
  }
}
</script>