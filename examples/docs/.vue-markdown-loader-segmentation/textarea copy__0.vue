<template>
  <div :class="$style.main">
    <p class="c_title">基础用法</p>
    <x-textarea placeholder="请输入" v-model="valueBasis"></x-textarea>
    <p class="c_title">禁用</p>
    <x-textarea disabled v-model="valueDisabled"></x-textarea>
  </div>
</template>
<script>
export default {
  data () {
    return {
      valueBasis: '落霞与孤鹜齐飞，秋水共长天一色',
      valueDisabled: '君不见，黄河之水天上来，奔流到海不复回',
    }
  }
}
</script>
<style module lang="scss">
.main{
  width: 300px;
}
</style>