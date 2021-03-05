<template>
  <div :class="$style.main">
    <div :class="$style.wrap">
      <div :class="$style.dot"></div>
      <div :class="$style.dot"></div>
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
  margin-top: 20px;
  .wrap{
    width: 200px;
    height: 200px;
    background-color: $color-rainbow-3;
    display: flex;
    padding: 20px;
    // align-items: flex-end;
    // justify-content: flex-end;
    justify-content: space-between;
    .dot{
      width: 20px;
      height: 20px;
      background-color: $color-rainbow-1;
    }
  }
}
</style>
