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