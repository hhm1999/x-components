### number 数字输入框
number 数字输入框。

```html
<template>
  <div>
    <p class="c_title">基础用法</p>
    <x-number placeholder="请输入" v-model="valueBasis"></x-number>
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
      valueBasis: 12,
      valuePrecision: 1,
      valueStep: 520,
      valueLimit: 0,
      valueDisabled: 24,
    }
  }
}
</script>
```
#### x-checkbox 属性
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| v-model    | 输入框内容   |  --  |  --  |  --  |
| precision  | 数字精度，即始终保留小数点位数   | number  |   --  |  --  |
| min  | 数值范围限制最小值   | number  |   --  |  --  |
| max  | 数值范围限制最大值   | number  |   --  |  --  |
| step  | 加减按钮操作每次加减的数值   | number  |   --  |  1  |
| disabled     | 是否禁用   | boolean  |   --  |    false     |
| placeholder  | 输入框提示文字   | string  |   --  |    请选择     |
