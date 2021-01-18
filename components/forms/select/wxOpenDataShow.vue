<template>
  <span :class="$style.main">
    <span :key="item" v-for="(item, index) in value">
      <x-ww-open-data :type="getWwOpenDataType(index)" :openid="item"></x-ww-open-data>
      <template v-if="index !== value.length - 1"> / </template>
    </span>
  </span>
</template>
<script>
export default {
  props: {
    value: {
      type: Array,
      default () {
        return null
      }
    },
    type: {
      type: String,
      default: 'member'
    }
  },
  data () {
    return {
      focus: false
    }
  },
  created () {
  },
  watch: {
  },
  computed: {
  },
  methods: {
    getWwOpenDataType (index) {
      if (this.type === 'member' && index === this.value.length - 1) {
        return 'userName'
      } else {
        return 'departmentName'
      }
    }
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  // width: 300px;
  // height: 40px;
}
</style>
