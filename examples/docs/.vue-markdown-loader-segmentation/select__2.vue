``` html
<template>
  <div :class="$style.main">
    <x-select
      :label-init="labelInit"
      @search-key-change="handlerSearchKeyChange"
      search
      v-model="valueBasis"
    >
      <x-select-option
        :disabled="item.disabled"
        :value="item.value"
        v-for="item in options"
        :key="item.value"
      >
        {{ item.label }}
      </x-select-option>
      <div v-show="isShowTipText || isLoading" :class="$style.tip">
        <div v-show="isShowTipText" :class="$style.text">{{ tipText }}</div>
        <x-spin v-show="isLoading" :size="30" :class="$style.spin"></x-spin>
      </div>
    </x-select>
  </div>
</template>
<script>
export default {
  data () {
    return {
      valueBasis: 4,
      labelInit: '惰性加载选项4',
      options: [],
      isShowTipText: true,
      isLoading: false,
      tipText: '请输入关键字搜索'
    }
  },
  methods: {
    handlerSearchKeyChange (key) {
      this.options.splice(0, this.options.length)
      this.isLoading = true
      this.isShowTipText = false
      setTimeout(() => {
        for (let i = 0; i < 12; i++) {
          this.options.push({
            label: key + '@惰性加载选项' + i,
            value: i + key,
          })
        }
        this.isLoading = false
      }, 1000)
    }
  }
}
</script>
<style module lang="scss">
.tip{
  height: 140px;
  text-align: center;
  .text{
    height: 135px;
    line-height: 140px;
    color: #909399;
    font-size: 14px;
  }
  .spin{
    margin-top: 50px;
  }
}
.main{
  width: 300px;
}
</style>