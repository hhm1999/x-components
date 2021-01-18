<template>
  <div :class="$style.main">
    <x-image-upload disabled v-model="value"></x-image-upload>
    {{ value }}
  </div>
</template>
<script>
export default {
  props: {
  },
  data () {
    return {
      value: [ 'c6f8ba8b-2fb0-4d1c-bac7-6ef987986454____originalFileName____222222.jpg' ]
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
  padding: 10px;
  // width: 300px;
}
</style>
