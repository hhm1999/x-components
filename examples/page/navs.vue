<template>
  <nav :class="$style.main">
    <navs-item :key="nav.path" v-for="nav in navs" :data="nav"></navs-item>
  </nav>
</template>

<script>
import navConfig from '../nav.config.json';
import navsItem from './navsItem';
export default {
  props: {
  },
  data () {
    return {
      navs: navConfig
    }
  },
  methods: {
  },
  computed: {
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
@media screen and (max-width: 900px){
  .main{
    padding: 50px 0px 10px 0px;
  }
}
</style>
