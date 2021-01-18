<template>
  <div>
    <x-btn @click="tipInfo">点击提示info</x-btn><br><br>
    <x-btn @click="tipSuccess" type="success">点击提示success</x-btn><br><br>
    <x-btn @click="tipError" type="danger">点击提示error</x-btn><br><br>
    <x-btn @click="tipWarning" type="warning">点击提示warning</x-btn><br><br>
  </div>
</template>
<script>
export default {
  props: {
  },
  data () {
    return {
      visible: true
    }
  },
  created () {
  },
  mounted() {
  },
  watch: {
  },
  computed: {
  },
  methods: {
    tipInfo () {
      this.$message({
        message: '普通提示'
      })
    },
    tipSuccess () {
      this.$message({
        type: 'success',
        message: '成功提示',
        duration: 0,
        showClose: true
      })
    },
    tipError () {
      this.$message({
        type: 'error',
        message: '错误提示'
      })
    },
    tipWarning () {
      this.$message({
        type: 'warning',
        message: '警告提示'
      })
    }
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  height: 200px;
  width: 100px;
  background-color: #999;
}
</style>
