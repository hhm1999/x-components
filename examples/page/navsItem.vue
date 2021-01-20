<template>
  <div :class="$style.main">
    <template v-if="data.children">
      <div :class="$style.title">{{ data.title }}</div>
      <navs-item :class="$style.lower_level" :key="nav.path" v-for="nav in data.children" :data="nav"></navs-item>
    </template>
    <template v-else>
      <router-link :class="classItem" :to="{ path }">{{ data.title }}</router-link>
    </template>
  </div>
</template>

<script>
export default {
  name: 'navsItem',
  props: {
    data: {
      type: Object,
      default () {
        return null
      }
    }
  },
  data () {
    return {
      isOn: false
    }
  },
  methods: {
    onState () {
      if (this.$route.fullPath === this.path) {
        this.isOn = true
      } else {
        this.isOn = false
      }
    }
  },
  watch: {
    '$route': {
      handler: 'onState',
      immediate: true
    }
  },
  computed: {
    classItem () {
      return {
        [this.$style.item]: true,
        [this.$style.on]: this.isOn
      }
    },
    path () {
      return '/' + this.data.path
    },
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
  }
}
</script>
<style module lang="scss">
.main{
  margin-bottom: 0px;
  .title{
    font-size: 14px;
    font-weight: 500;
    color: $color-text-regular;
    margin-bottom: 5px;
    margin-top: 5px;
    padding: 0 10px;
  }
  .lower_level{
    .item{
      padding-left: 20px;
    }
  }
  .item{
    padding: 0 10px;
    text-decoration: none;
    display: block;
    color: $color-text-regular;
    font-size: 14px;
    line-height: 40px;
    &.on{
      font-weight: 700;
      color: $color-primary;
      background-color: $color-primary-extra-light;
    }
    &:hover{
      color: $color-primary;
    }
  }
}
</style>
