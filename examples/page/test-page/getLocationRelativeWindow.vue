<template>
  <div :class="$style.main">
    <div id="getLocationRelativeWindowScroll" :class="$style.scroll">
      <div @click="handleClick" ref="tag" id="getLocationRelativeWindowTag" :class="$style.tag"></div>
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
  position: relative;
  height: 1200px;
  margin-top: 20px;
  .scroll{
    width: 400px;
    height: 400px;
    overflow: scroll;
    background-color: $color-rainbow-1;
  }
  .tag{
    width: 50px;
    height: 50px;
    margin: 250px 175px;
    background-color: $color-rainbow-4;
  }
}
</style>
