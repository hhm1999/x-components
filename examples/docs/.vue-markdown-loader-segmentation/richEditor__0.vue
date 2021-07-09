<template>
  <div :class="$style.main">
    <p class="c_title">基础用法</p>
    <x-rich-editor placeholder="请输入" v-model="valueBasis"></x-rich-editor>
  </div>
</template>
<script>
export default {
  data () {
    return {
      valueBasis: '<span style="color: #E6A23C;">落霞</span>与孤鹜齐飞，秋水共长<span style="color: #409EFF;">天</span>一色',
    }
  }
}
</script>
<style module lang="scss">
.main{
  width: 400px;
}
</style>