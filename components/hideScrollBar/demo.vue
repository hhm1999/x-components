<template>
  <div>
    <x-hide-scroll-bar x y :class="$style.main">
      <div>
        <div :class="$style.don_wrap">春江潮水连海平，海上明月共潮生。 滟滟随波千万里，何处春江无月明！ 江流宛转绕芳甸，月照花林皆似霰； 空里流霜不觉飞，汀上白沙看不见。 江天一色无纤尘，皎皎空中孤月轮。 江畔何人初见月？江月何年初照人？ 人生代代无穷已，江月年年望相似。</div>
        <br>
        君不见，黄河之水天上来，奔流到海不复回。<br><br><br>
        君不见，高堂明镜悲白发，朝如青丝暮成雪！<br><br><br>
        人生得意须尽欢，莫使金樽空对月。<br><br><br>
        天生我材必有用，千金散尽还复来。<br><br><br>
        烹羊宰牛且为乐，会须一饮三百杯。<br><br><br>
        岑夫子，丹丘生，将进酒，杯莫停。<br><br><br>
        与君歌一曲，请君为我倾耳听。<br><br><br>
        钟鼓馔玉不足贵，但愿长醉不复醒。<br><br><br>
        古来圣贤皆寂寞，惟有饮者留其名。<br><br><br>
        陈王昔时宴平乐，斗酒十千恣欢谑。<br><br><br>
        主人何为言少钱，径须沽取对君酌。<br><br><br>
        五花马、千金裘，呼儿将出换美酒，与尔同销万古愁！<br><br><br>
        <br>
      </div>
    </x-hide-scroll-bar>
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
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  height: 400px;
  width: 400px;
  background-color: $background-color-base;
  .don_wrap{
    white-space: nowrap;
  }
}
</style>
