<template>
  <div :class="$style.main">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'x-select-option-tip',
  props: {
  },
  data () {
    return {
    }
  },
  created () {
  },
  mounted() {
  },
  watch: {
  },
  computed: {
  },
  methods: {
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  width: 100%;
  height: 100px;
  line-height: 100px;
  color: $color-text-placeholder;
  font-size: 14px;
  text-align: center;
}
</style>
