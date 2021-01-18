### checkbox 多选框
多选框。

```html
<template>
  <div>
    <p class="c_title">单独使用</p>
    <x-checkbox v-model="valueSeparate">选项</x-checkbox>
    <p class="c_title">禁用</p>
    <x-checkbox disabled v-model="valueDisabled">选项</x-checkbox>
    <p class="c_title">半选中状态</p>
    <x-checkbox indeterminate v-model="valueIndeterminate">选项</x-checkbox>
    <p class="c_title">选项组</p>
    <x-checkbox-group v-model="valueGroup">
      <x-checkbox :label="1">
        选项1
      </x-checkbox>
      <x-checkbox :label="2">
        选项2
      </x-checkbox>
      <x-checkbox :label="3">
        选项3
      </x-checkbox>
    </x-checkbox-group>
    <p class="c_title">选项组-数据版</p>
    <x-checkbox-group :options="options" v-model="valueData"></x-checkbox-group>
  </div>
</template>
<script>
export default {
  data () {
    return {
      valueSeparate: true,
      valueDisabled: false,
      valueIndeterminate: true,
      valueData: ['Apple'],
      valueGroup: [2],
      options: [
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange', disabled: true }
      ]
    }
  }
}
</script>
```
#### x-checkbox 属性
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| v-model    | 选中项的值   |  array  |  --  |  --  |
| disabled     | 是否禁用   | boolean  |   --  |    false     |
| indeterminate     | 半选中状态   | boolean  |   --  |    false     |
| label     | 多选项状态下的选项值   | --  |   --  |    --     |

#### x-checkbox-group 属性
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| v-model    | 选中项的值   |  array  |  --  |  --  |
| options     | 选项数据   |  array  |  --  |  --  |
| options[i].label     | 选项数据标签值   |  --  |  --  |  --  |
| options[i].value     | 选项数据值   |  --  |  --  |  --  |
| options[i].disabled     | 选项是否不可用   |  boolean  |  --  |  false  |