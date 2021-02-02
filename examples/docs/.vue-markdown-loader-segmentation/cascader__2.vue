<template>
  <div :class="$style.main">
    <p class="c_title">惰性加载数据</p>
    <x-cascader
      @drop-down-visibility-change="handlerDropDownVisibilityChange"
      @lazy-load="handlerLazyLoad"
      v-model="value"
      :label-init="labelInit"
      :options="options"
    >
    </x-cascader>
  </div>
</template>
<script>
export default {
   data () {
    return {
      value: ['0', '02'],
      labelInit: ['一级选项0', '二级选项02'],
      options: [],
      isFirstShow: true
    }
  },
  methods: {
    handlerDropDownVisibilityChange (visibility) { // 通过dropDownVisibilityChange事件监听下拉框的显示状态，第一次显示时加载数据
      if (!this.isFirstShow) {
        return
      }
      this.isFirstShow = false
      setTimeout(() => {
        let options = []
        for (let i = 0; i < 10; i++) {
          this.options.push({
            label: '一级选项' + i,
            value: i + '',
            hasChildren: true
          })
        }
      }, 1000)
    },
    handlerLazyLoad (optionData, callbackSuccess, callbackFailure) {
      setTimeout(() => {
        let datas = []
        for (let i = 0; i < 5; i++) {
          datas.push({
            label: '二级选项' + optionData.value + i,
            value: optionData.value + '' + i,
          })
        }
        callbackSuccess(datas)
      }, 1000)
    }
  }
}
</script>
<style module lang="scss">
.main{
  width: 300px;
}
</style>