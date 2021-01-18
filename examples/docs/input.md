### input 输入框
input 输入框。

```html
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
```
#### x-checkbox 属性
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| v-model    | 输入框内容   |  --  |  --  |  --  |
| size     | 尺寸   | string  |   default / small / mini  |    default     |
| readonly     | 是否设置为只可读状态   | boolean  |   --  |    false     |
| disabled     | 是否禁用   | boolean  |   --  |    false     |
| placeholder  | 输入框提示文字   | string  |   --  |    请选择     |
