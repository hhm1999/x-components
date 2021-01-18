<template>
  <div :class="$style.main">
    加载中
    <div :class="$style.items">
      <x-loading></x-loading>
    </div>
    失败
    <div :class="$style.items">
      <x-loading type="error"></x-loading>
    </div>
    成功
    <div :class="$style.items">
      <x-loading type="success"></x-loading>
    </div>
    警告
    <div :class="$style.items">
      <x-loading type="warning">
        <p :class="$style.text">数据加载失败</p>
        <x-btn size="small" round>重新加载</x-btn>
      </x-loading>
    </div>
  </div>
</template>
<script>
export default {
  props: {
  },
  data () {
    return {
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
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  // background-color: blue;
  .items{
    position: relative;
    width: 300px;
    height: 300px;
    float: left;
    background-color: $color-rainbow-4;
    margin: 10px;
  }
  .text{
    margin: 10px 0px;
  }
}
</style>
