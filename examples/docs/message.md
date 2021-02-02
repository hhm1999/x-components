### message 消息提示
各种风格的消息提示。

#### 点击按钮弹出各类提示
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
```
::: warning
x-components 会在Vue全局注入`$message`方法，在Vue实例内可直接采用 `this.$message()`的方法调用。
:::

#### drag 属性
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type  | 消息的风格类型 | string  |   info / success / warning / error |    info     |
| message  | 消息内容 |  string   |   --  |    --     |
| duration  | 显示时间，单位毫秒，该值为0时消息不自动消失 |  number   |   --  |    3000     |
| showClose  | 是否显示关闭图标按钮 |  boolean   |   --  |    false     |