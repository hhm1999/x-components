``` html
<template>
  <div :class="$style.main">
    <p class="c_title">基础</p>
    <x-cascader placeholder="请选择" v-model="valueBasis" :options="options"></x-cascader>
    <p class="c_title">可搜索</p>
    <x-cascader v-model="valueSearch" search :options="options"></x-cascader>
    <p class="c_title">多选</p>
    <x-cascader v-model="valueMultiple" multiple :options="options"></x-cascader>
    <p class="c_title">允许选中任何一个层级的选项</p>
    <x-cascader v-model="valueFreeSelect" free-select :options="options"></x-cascader>
    <p class="c_title">自定义下拉框宽度</p>
    <x-cascader v-model="valueWidth" :option-container-width="298" :options="options"></x-cascader>
    <p class="c_title">禁用</p>
    <x-cascader v-model="valueDisabled" disabled :options="options"></x-cascader>
  </div>
</template>
<script>
export default {
   data () {
    return {
      valueBasis: [ '选项2' ],
      valueSearch: [ '选项1', '选项b' ],
      valueMultiple: [ [ '选项2' ], [ '选项1', '选项b' ] ],
      valueDisabled: [ '选项1', '选项a' ],
      valueFreeSelect: [ '选项1' ],
      valueWidth: [ '选项2' ],
      options: [
        {
          label: '选项1',
          value: '选项1',
          children: [
            {
              label: '选项a',
              value: '选项a'
            },
            {
              label: '选项b',
              value: '选项b'
            }
          ]
        },
        {
          label: '选项2',
          value: '选项2'
        }
      ]
    }
  },
}
</script>
<style module lang="scss">
.main{
  width: 300px;
}
</style>