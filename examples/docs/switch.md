### switch 开关
switch 开关。 

```html
<template>
  <div>
    <p class="c_title">普通</p>
    <x-switch v-model="value">选项</x-switch>
    <p class="c_title">禁用</p>
    <x-switch disabled v-model="valueDisabled">选项</x-switch>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: true,
      valueDisabled: true
    }
  }
}
</script>
```
#### 属性
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| v-model    | 选中项的值   |  --  |  --  |  --  |
| disabled     | 是否禁用   | boolean  |   --  |    false     |