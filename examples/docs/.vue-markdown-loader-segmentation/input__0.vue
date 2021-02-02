``` html
<template>
  <div :class="$style.main">
    <p class="c_title">基础用法</p>
    <x-input placeholder="请输入" v-model="valueBasis"></x-input>
    <p class="c_title">小尺寸</p>
    <x-input size="small" v-model="valueSmall"></x-input>
    <p class="c_title">迷你尺寸</p>
    <x-input size="mini" v-model="valueMini"></x-input>
    <p class="c_title">只读</p>
    <x-input readonly v-model="valueDisabled"></x-input>
    <p class="c_title">禁用</p>
    <x-input disabled v-model="valueDisabled"></x-input>
  </div>
</template>
<script>
export default {
  data () {
    return {
      valueBasis: '',
      valueSmall: 'small',
      valueMini: 'mini',
      valueReadonly: 'readonly',
      valueDisabled: '不可修改',
    }
  }
}
</script>
<style module lang="scss">
.main{
  width: 300px;
}
</style>