### loading 加载提示
加载中，成功，失败，重试等状态提示

#### 基础用法
```html
<template>
  <div :class="$style.main">
    <x-loading loading-text="数据加载中···"></x-loading>
  </div>
</template>
<style module lang="scss">
.main{
  position: relative;
  height: 250px;
}
</style>
```

#### 状态切换
```html
<template>
  <div :class="$style.main">
    <div :class="$style.container">
      <x-loading :type="type">
        <template v-if="type==='error'">
          <p :class="$style.text">数据加载失败</p>
          <x-btn size="small" round>重新加载</x-btn>
        </template>
        <p v-else-if="type==='success'" :class="$style.text">数据提交成功</p>
        <p v-else-if="type==='warning'" :class="$style.text">网络错误</p>
      </x-loading>
    </div>
    <x-btn @click="type='loading'" :class="$style.btn" type="primary">加载 状态</x-btn>
    <x-btn @click="type='success'" :class="$style.btn" type="success">完成 状态</x-btn>
    <x-btn @click="type='warning'" :class="$style.btn" type="warning">警告 状态</x-btn>
    <x-btn @click="type='error'" :class="$style.btn" type="danger">错误 状态</x-btn>
  </div>
</template>
<script>
export default {
  data () {
    return {
      type: 'loading'
    }
  },
  methods: {
  }
}
</script>
<style module lang="scss">
.main{
  text-align: center;
  .container{
    position: relative;
    height: 250px;
    margin-bottom: 10px;
    /* background-color: #dd7c4f; */
    .text{
      margin: 10px 0px;
    }
  }
  .btn{
    margin-right: 10px;
  }
}
</style>
```

#### 属性
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type     | 状态   | string  |   loading / success / warning / error |    loading     |
| loading-text     | 加载中的文字提示   | string  |   --  |    加载中···     |