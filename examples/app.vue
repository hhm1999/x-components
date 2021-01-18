<template>
  <div id="app">
    <keep-alive>
      <router-view>
      </router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style lang="scss">
body{
  // box-sizing: border-box;
  font-family: Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
}
*{
  padding:0px;
  margin:0px;
  // box-sizing: border-box;
}
.c_title{
  font-size: 14px;
  margin: 20px 0 10px 0 !important;
  &:first-child{
    margin-top: 0px !important;
  }
}
</style>
