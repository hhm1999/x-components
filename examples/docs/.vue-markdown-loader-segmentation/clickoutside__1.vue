<template>
  <div>
    <div v-x-clickoutside="handleClickoutside" class="main">
      点击这个div不触发回调函数<br>点击其它任意位置都会触发回调函数
    </div>
    <p class="tip" v-show="isClickoutside">点击了其它节点</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isClickoutside: false
    }
  },
  methods: {
    handleClickoutside () {
      this.isClickoutside = true
    }
  }
}
</script>
<style scoped lang="scss">
.main{
  background: #9ec29c;
  width: 300px;
  height: 200px;
  display: table-cell;
  vertical-align:middle;
  border-radius: 4px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  cursor: pointer;
}
.tip{
  font-size: 14px;
  margin-top: 10px;
  color: #dd7c4f;
  font-weight: 700;
}
</style>