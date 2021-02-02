``` html
<template>
  <div :class="$style.main">
    <p class="c_title">通过回调函数自定义选项是否可选</p>
    <x-cascader :allow-select="allowSelect" v-model="value" :options="options"></x-cascader>
  </div>
</template>
<script>
export default {
   data () {
    return {
      value: [ '选项1', '选项a' ],
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
          value: '选项2',
          disabled: true, // 通过disabled控制选项是否可选
        }
      ]
    }
  },
  methods: {
    allowSelect (val) {
      if (val.value === '选项b') { // value为'选项b'的选项不可选
        return false
      }
      return true
    }
  }
}
</script>
<style module lang="scss">
.main{
  width: 300px;
}
</style>