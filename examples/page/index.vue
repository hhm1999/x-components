<template>
  <div :class="$style.main">
    <top></top>
    <navs :width="widthNavs"></navs>
    <div :style="styleBody" :class="$style.body">
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
    widthNavs () {
      let width = window.innerWidth * 0.2
      if (width < 200) {
        width = 200
      } else if (width > 250) {
        width = 250
      }
      return width
    },
    styleBody () {
      return {
        paddingLeft: this.widthNavs + 20 + 'px'
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
    navs,
    top
  }
}
</script>
<style module lang="scss">
.main{
  padding: 0px;
  .body{
    padding: 80px 20px 20px 20px;
  }
}
</style>
