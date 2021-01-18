<template>
  <div>
    <x-tooltip-confirm placement="top-start" :visibility="visibility">
      <div :class="$style.content" slot="content">
        <p :class="$style.text">确认删除吗？该操作不可逆！</p>
        <x-btn @click="confirm" :class="$style.btn" size="small" type="danger">删除</x-btn>
        <x-btn @click="cancel" :class="$style.btn" size="small">取消</x-btn>
      </div>
      <x-btn @click="del" type="danger">删除</x-btn>
    </x-tooltip-confirm>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visibility: false
    }
  },
  methods: {
    cancel () {
      this.visibility = false
    },
    confirm () {
      this.visibility = false
    },
    del () {
      this.visibility = true
    }
  }
}
</script>
<style module lang="scss">
.content{
  .text{
    margin-bottom: 8px;
    line-height: 25px;
    font-size: 14px;
  }
  .btn{
    margin-left: 8px;
    float: right;
    margin-bottom: 2px;
  }
}
</style>