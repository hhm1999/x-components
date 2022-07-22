<template>
  <div :class="$style.main" class="vueMarkdownLoaderDemoContainer">
    <div :class="$style.component">
      <slot name="component"></slot>
    </div>
    <div v-show="showCode" ref="codeContainer" :class="$style.code">
      <slot name="code"></slot>
    </div>
    <div @click="showCode=!showCode" :class="$style.show_code_bar">
      {{ showCode ? '隐藏源码': '显示源码' }}
    </div>
  </div>
</template>

<script>
import 'highlight.js/styles/atom-one-light.css';
// tomorrow solarized-light atom-one-light
// import hljs from 'highlight.js'
export default {
  name: 'vueMarkdownLoaderDemoContainer',
  props: {
  },
  data () {
    return {
      showCode: false
    }
  },
  mounted () {
    // this.$refs.codeContainer.querySelectorAll('pre code').forEach((block) => {
    //   hljs.highlightBlock(block)
    // })
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  // background-color: $background-color-base;
  // box-shadow: $boxShadowTiny;
  border: 1px solid $border-color-light;
  border-radius: 4px;
  margin-top: 16px;
  margin-bottom: 20px;
  transition: .2s;
  &:hover{
    box-shadow: $boxShadowTiny;
  }
  .component{
    padding: 25px;
  }
  @media screen and (max-width: 900px){
    .component{
      padding: 10px;
    }
  }
  .code{
    border-top: 1px solid $border-color-light;
  }
  .show_code_bar{
    border-top: 1px dashed $border-color-light;
    height:40px;
    line-height: 39px;
    text-align: center;
    font-size: 13px;
    cursor: pointer;
    color: $color-text-secondary;
    &:hover{
      color: $color-primary;
    }
  }
}
</style>
