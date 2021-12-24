<template>
  <div :class="$style.main">
    <div :class="$style.container">
      <x-loading :type="type" :text="text">
        <template v-if="type==='error'">
          <p :class="$style.text">数据加载失败</p>
          <x-btn size="small" round>重新加载</x-btn>
        </template>
        <!-- <p v-else-if="type==='success'" :class="$style.text">数据提交成功</p>
        <p v-else-if="type==='warning'" :class="$style.text">网络错误</p> -->
      </x-loading>
    </div>
    <x-btn @click="type='loading';text='数据提交中···'" :class="$style.btn" type="primary">加载 状态</x-btn>
    <x-btn @click="type='success';text='数据提交成功'" :class="$style.btn" type="success">完成 状态</x-btn>
    <x-btn @click="type='warning';text='网络错误'" :class="$style.btn" type="warning">警告 状态</x-btn>
    <x-btn @click="type='error';text='数据加载失败!'" :class="$style.btn" type="danger">错误 状态</x-btn>
  </div>
</template>
<script>
export default {
  data () {
    return {
      type: 'loading',
      text: '数据加载中···',
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
    z-index: 1;
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