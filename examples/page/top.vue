<template>
  <div :class="$style.main" :style="styleMain">
    <div :class="$style.name">
      <span :class="$style.color1">x</span>
      <span :class="$style.color2">-</span>
      <span :class="$style.color3">com</span>
      <span :class="$style.color4">pon</span>
      <span :class="$style.color5">ent</span>
      <span :class="$style.color6">s</span>
    </div>
    <a href="https://github.com/"><x-icon :class="$style.github" type="doc-github"></x-icon></a>
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
  methods: {
  },
  computed: {
    styleMain () {
      return {
      }
    }
  },
  created () {
  },
  updated () {
  },
  mounted() {
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  box-shadow: 0 2px 8px #f0f1f2;
  height: 60px;
  position: fixed;
  width: 100%;
  background-color: #fafafa;
  border-bottom: 1px solid #e8e8e8;
  box-sizing: border-box;
  top: 0px;
  left: 0px;
  z-index: 1;
  .name{
    display: inline-block;
    font-size: 25px;
    line-height: 54px;
    font-weight: 700;
    padding-left: 20px;
    .color1{
      color: $color-primary;
    }
    .color2{
      color: $color-rainbow-6;
    }
    .color3{
      color: $color-danger;
    }
    .color4{
      color: $color-rainbow-4;
    }
    .color5{
      color: $color-rainbow-3;
    }
    .color6{
      color: $color-rainbow-5;
    }
  }
  .github{
    color: $color-text-regular;
    float: right;
    font-size: 30px;
    margin: 14px;
    &:hover{
      color: #24292e;
    }
  }
}
</style>
