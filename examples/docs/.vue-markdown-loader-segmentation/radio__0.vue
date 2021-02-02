``` html
<template>
  <div>
    <p class="c_title">单独使用</p>
    <x-radio label="separate" v-model="valueSeparate">选项</x-radio>
    <p class="c_title">禁用</p>
    <x-radio disabled label="disabled" v-model="valueDisabled">选项</x-radio>
    <p class="c_title">选项组</p>
    <x-radio-group v-model="valueGroup">
      <x-radio :label="1">
        选项1
      </x-radio>
      <x-radio :label="2">
        选项2
      </x-radio>
      <x-radio :label="3">
        选项3
      </x-radio>
    </x-radio-group>
    <p class="c_title">选项组-数据版</p>
    <x-radio-group :options="options" v-model="valueData"></x-radio-group>
  </div>
</template>
<script>
export default {
  data () {
    return {
      valueSeparate: 'separate',
      valueDisabled: 'disabled',
      valueGroup: 2,
      valueData: 'Apple',
      options: [
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange', disabled: true }
      ]
    }
  }
}
</script>