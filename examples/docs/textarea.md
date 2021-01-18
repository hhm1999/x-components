### textarea 长文本输入框
textarea 长文本输入框。

```html
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
```
#### x-checkbox 属性
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| v-model    | 输入框内容   |  --  |  --  |  --  |
| disabled     | 是否禁用   | boolean  |   --  |    false     |
| placeholder  | 输入框提示文字   | string  |   --  |    请选择     |
