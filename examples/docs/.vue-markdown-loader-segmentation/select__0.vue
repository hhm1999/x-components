<template>
  <div :class="$style.main">
    <p class="c_title">基础</p>
    <x-select placeholder="请选择" v-model="valueBasis">
      <x-select-option
        :disabled="item.disabled"
        :value="item.value"
        v-for="item in options"
        :key="item.value"
      >
        {{ item.label }}
      </x-select-option>
    </x-select>
    <p class="c_title">多选</p>
    <x-select multiple v-model="valueMultiple">
      <x-select-option
        :disabled="item.disabled"
        :value="item.value"
        v-for="item in options"
        :key="item.value"
      >
        {{ item.label }}
      </x-select-option>
    </x-select>
    <p class="c_title">可搜索</p>
    <x-select search v-model="valueSearch">
      <x-select-option
        :disabled="item.disabled"
        :value="item.value"
        v-for="item in options"
        :key="item.value"
      >
        {{ item.label }}
      </x-select-option>
    </x-select>
    <p class="c_title" @click="multiple=true">数据版</p>
    <x-select :multiple="multiple" :options="options" v-model="valueDatas">
    </x-select>
  </div>
</template>
<script>
export default {
   data () {
    return {
      valueMultiple: [ 1, 3 ],
      valueBasis: 2,
      valueSearch: 3,
      valueDatas: null,
      multiple: false,
      options: [
        {
          label: '选项1',
          value: 1
        },
        {
          label: '选项2',
          value: 2
        },
        {
          label: '选项3',
          value: 3
        },
        {
          label: '选项4',
          value: 4
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