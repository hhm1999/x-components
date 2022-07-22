<template>
  <div :class="$style.main">
    <x-tooltip :visibility="visibility" :interaction="false" :content="content" placement="right-start">
      <x-btn @click="click" :class="$style.btn">点击{{!visibility ? '显示' : '关闭' }}</x-btn>
    </x-tooltip>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visibility: false,
      content: '点击关闭',
    }
  },
  methods: {
    click() {
      this.visibility = !this.visibility
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