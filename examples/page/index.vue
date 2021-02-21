<template>
  <div :class="$style.main">
    <top @click-menu-bar="handleClickMenuBar"></top>
    <navs :class="classNavs" v-x-clickoutside="handleNavsClickoutside"></navs>
    <div ref="body" :class="$style.body">
      <keep-alive>
        <router-view>
        </router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import './github-markdown.scss';
import navs from './navs.vue';
import top from './top.vue';
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import 'highlight.js/styles/atom-one-light.css';
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
export default {
  props: {
  },
  data () {
    return {
      navsShow: false
    }
  },
  methods: {
    handleClickMenuBar () {
      this.navsShow = !this.navsShow
    },
    handleNavsClickoutside () {
      if (this.navsShow) {
        this.navsShow = false
      }
    }
  },
  computed: {
    classNavs () {
      return {
        [this.$style.navs]: true,
        [this.$style.show]: this.navsShow
      }
    }
  },
  created () {
    this.$router.afterEach(() => {
      this.navsShow = false
    })
  },
  mounted() {
    this.$refs.body.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  updated () {
    this.$nextTick(() => {
      this.$refs.body.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block)
      })
    })
  },
  components: {
    navs,
    top
  }
}
</script>
<style module lang="scss">
.main{
  padding: 0px;
  .navs{
    width: 250px;
    z-index: 2;
  }
  .body{
    padding: 60px 20px 20px 270px;
  }
  @media screen and (max-width: 900px){
    .navs{
      width: 220px;
      transition: all 0.3s cubic-bezier(0.3, 0, 0, 1);
      transform: translate(-220px, 0);
      &.show{
        transform: translate(0px, 0);
      }
    }
    .body{
      padding: 50px 10px 10px 10px;
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
