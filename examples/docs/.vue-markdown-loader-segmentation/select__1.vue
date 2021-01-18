<template>
  <div :class="$style.main">
    <x-select :label-init="labelInit" @drop-down-visibility-change="handlerDropDownVisibilityChange" v-model="valueBasis">
      <x-select-option
        :disabled="item.disabled"
        :value="item.value"
        v-for="item in options"
        :key="item.value"
      >
        {{ item.label }}
      </x-select-option>
      <div v-if="isLoading" :class="$style.loading_tip"><x-spin :size="30" :class="$style.spin"></x-spin></div>
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
      isFirstShow: true,
      isLoading: true
    }
  },
  methods: {
    handlerDropDownVisibilityChange (visibility) {
      if (this.isFirstShow) {
        this.isFirstShow = false
        setTimeout(() => {
          for (let i = 0; i < 12; i++) {
            this.options.push({
              label: '惰性加载选项' + i,
              value: i,
            })
          }
          this.isLoading = false
        }, 1000)
      }
    }
  }
}
</script>
<style module lang="scss">
.loading_tip{
  height: 140px;
  text-align: center;
  .spin{
    margin-top: 50px;
  }
}
.main{
  width: 300px;
}
</style>