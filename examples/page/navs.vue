<template>
  <nav :class="$style.main" :style="styleMain">
    <navs-item :key="nav.path" v-for="nav in navs" :data="nav"></navs-item>
    <!-- {{ navs }} -->
  </nav>
</template>

<script>
import navConfig from '../nav.config.json';
import navsItem from './navsItem';
export default {
  props: {
    width: {
      type: Number,
      default: 300
    }
  },
  data () {
    return {
      navs: navConfig
    }
  },
  methods: {
  },
  computed: {
    styleMain () {
      return {
        width: this.width + 'px'
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
    navsItem
  }
}
</script>
<style module lang="scss">
.main{
  position: fixed;
  height: 100vh;
  background-color: #fafafa;
  border: 1px solid #e8e8e8;
  border-top: none;
  border-bottom: none;
  padding: 70px 0px 10px 0px;
  overflow: hidden auto;
  box-sizing: border-box;
}
</style>
