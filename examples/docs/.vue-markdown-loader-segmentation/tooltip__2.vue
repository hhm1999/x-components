<template>
  <div :class="$style.main">
    <x-tooltip :visibility="visibility" :interaction="false" placement="right-start">
      <div slot="content">{{ content }}</div>
      <x-btn @click="click" :class="$style.btn">点击{{!visibility ? '显示' : '关闭' }}</x-btn>
    </x-tooltip>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visibility: false,
      content: '123',
    }
  },
  methods: {
    click() {
      this.visibility = true
      setTimeout(() => {
        this.content = '456'
      }, 1000)
    }
  }
}
</script>
<style module lang="scss">
.content{
  line-height: 30px;
  padding: 3px 10px 10px 10px;
  text-align: left;
}
</style>