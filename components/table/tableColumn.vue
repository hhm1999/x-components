<template>
  <div :class="$style.main">
  </div>
</template>
<script>
export default {
  name: 'x-table-column',
  props: {
    prop: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
  },
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
}
</style>
