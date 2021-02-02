``` html
<template>
  <div :class="$style.main">
    <x-btn @click="normalMessage" :class="$style.btn" type="primary">普通提示</x-btn>
    <x-btn @click="successMessage" :class="$style.btn" type="success">完成提示</x-btn>
    <x-btn @click="warningMessage" :class="$style.btn" type="warning">警告提示</x-btn>
    <x-btn @click="dangerMessage" :class="$style.btn" type="danger">错误提示</x-btn>
    </br>
    <x-btn @click="durationMessage" :class="$style.btn">自定义显示时间</x-btn>
    <x-btn @click="closeMessage" :class="$style.btn">显示关闭图标</x-btn>
    <x-btn @click="noAutoCloseMessage" :class="$style.btn">不自动关闭</x-btn>
  </div>
  </div>
</template>
<script>
export default {
  methods: {
    normalMessage () {
      this.$message('普通提示')
    },
    successMessage () {
      this.$message({
        type: 'success',
        message: '成功提示'
      })
    },
    warningMessage () {
      this.$message({
        type: 'warning',
        message: '警告提示'
      })
    },
    dangerMessage () {
      this.$message({
        type: 'error',
        message: '错误提示'
      })
    },
    durationMessage () {
      this.$message({
        type: 'success',
        message: '这个提示5秒才会消失',
        duration: 5000
      })
    },
    closeMessage () {
      this.$message({
        type: 'success',
        message: '点击右侧图标可提前关闭消息',
        showClose: true
      })
    },
    noAutoCloseMessage () {
      this.$message({
        type: 'success',
        message: '不自动消失的消息，点击右侧图标可关闭',
        showClose: true,
        duration: 0
      })
    }
  }
}
</script>
<style module lang="scss">
.main{
  .btn{
    margin: 0 20px 20px 0;
  }
}
</style>