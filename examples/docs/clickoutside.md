### clickoutside 点击其它
全局的自定义指令，单击绑定该指令及其子节点以为的节点的时候会触发回调函数。

``` html
<template>
  <div>
    <div v-x-clickoutside="handleClickoutside" class="main">
      点击这个div不触发回调函数<br>点击其它任意位置都会触发回调函数
    </div>
    <div @mousedown.stop class="ignore">
      点击这个div也不触发
    </div>
    <div class="other">
      点击这个div触发
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
  width: 310px;
  height: 200px;
  display: table-cell;
  vertical-align:middle;
  border-radius: 4px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  cursor: pointer;
}
.ignore{
  background: #b59cd5;
  width: 150px;
  height: 100px;
  line-height: 100px;
  border-radius: 4px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  margin-top: 10px;
  display: inline-block;
}
.other{
  background: #dd7c4f;
  width: 150px;
  height: 100px;
  line-height: 100px;
  border-radius: 4px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  margin: 10px 0 0 10px;
  display: inline-block;
}
.tip{
  font-size: 14px;
  margin-top: 10px;
  color: #dd7c4f;
  font-weight: 700;
}
</style>
```
::: warning
由于指令实际是用`mousedown`事件监听的，所以如果除了绑定指令的节点外还有节点也不想触发回调函数，只需要像例子中的紫色div一样添加`@mousedown.stop`即可。
:::
