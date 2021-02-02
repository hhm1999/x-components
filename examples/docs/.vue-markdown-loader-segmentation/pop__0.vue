``` html
<template>
  <div :class="$style.main">
    <x-pop title="水调歌头" v-model="visible">
      <div :class="$style.content">
        <p>丙辰中秋，欢饮达旦，大醉，作此篇，兼怀子由。</p>
        <p>明月几时有，把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间。</p>
        <p>转朱阁，低绮户，照无眠。不应有恨，何事长向别时圆？人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共婵娟。</p>
      </div>
      <template slot="footer">
        <x-btn type="primary" @click="visibleSize=false">确定</x-btn>
        <x-btn @click="visible=false">关闭</x-btn>
      </template>
    </x-pop>
    <x-pop title="水调歌头" :width="500" :height="400" :show-close="false" v-model="visibleSize">
      <div :class="$style.content">
        <p>丙辰中秋，欢饮达旦，大醉，作此篇，兼怀子由。</p>
        <p>明月几时有，把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间。</p>
        <p>转朱阁，低绮户，照无眠。不应有恨，何事长向别时圆？人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共婵娟。</p>
      </div>
      <template slot="footer">
        <x-btn type="primary" @click="visibleSize=false">确定</x-btn>
        <x-btn @click="visibleSize=false">关闭</x-btn>
      </template>
    </x-pop>
    <x-btn :class="$style.btn" type="primary" @click="visible=true">打开弹窗</x-btn>
    <x-btn :class="$style.btn" type="primary" @click="visibleSize=true">打开自定义尺寸弹窗</x-btn>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible: false,
      visibleSize: false
    }
  }
}
</script>
<style module lang="scss">
.main{
  .content{
    font-size: 14px;
    padding: 10px 12px;
  }
  .btn{
    margin-right: 10px;
  }
}
</style>