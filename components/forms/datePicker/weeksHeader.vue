<template>
  <div :style="styleMain" :class="classMain">
    <span v-for="item in list" :key="item" :class="$style.items">{{ item }}</span>
  </div>
</template>
<script>
export default {
  props: {
    size: {
      type: Number,
      default: 40
    }
  },
  data () {
    return {
      list: [
        '日',
        '一',
        '二',
        '三',
        '四',
        '五',
        '六'
      ]
    }
  },
  created () {
  },
  mounted () {
  },
  watch: {
  },
  computed: {
    styleMain () {
      return {
        height: this.size + 'px',
        lineHeight: this.size + 'px'
      }
    },
    classMain () {
      return {
        // [this.$style.small]: this.size === 'small',
        [this.$style.main]: true
      }
    }
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
  border-bottom: 1px solid $border-color-lighter;
  padding: 0 5px;
  box-sizing: border-box;
  .items{
    display: inline-block;
    width: 14.3%;
    text-align: center;
    font-size: 12px;
    &:last-child{
      width: 14.2%;
    }
  }
}
</style>
