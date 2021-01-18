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
import hljs from 'highlight.js'
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
    // hljs.configure({
    //   languages: 'vue'
    // })
    this.$refs.codeContainer.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block)
    })
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
  code {
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: 12px;
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 14px;
    background-color: rgba(27,31,35,0.05);
    border-radius: 3px;
  }
  pre {
    margin-top: 0;
    margin-bottom: 0;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: 12px;
    word-wrap: normal;
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: #f6f8fa;
    border-radius: 3px;
  }
  pre>code {
    padding: 0;
    margin: 0;
    font-size: 100%;
    word-break: normal;
    white-space: pre;
    background: transparent;
    border: 0;
  }
  pre code {
    display: inline;
    max-width: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    line-height: inherit;
    word-wrap: normal;
    background-color: transparent;
    border: 0;
  }
}
</style>
