<template>
  <img @click="handelClick" :class="$style.img" :src="src" />
</template>
<script>
import Vue from 'vue'
const popConstructor = Vue.extend(require('./pop.vue').default)
export default {
  name: 'x-image',
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      popInstance: null
    }
  },
  methods: {
    handelClick () {
      if (!this.popInstance) {
        this.popInstance = new popConstructor()
        this.popInstance.vm = this.popInstance.$mount()
        this.popInstance.vm.visible = true
        document.body.appendChild(this.popInstance.vm.$el)
      }
      this.popInstance.open_show(this.src)
    }
  },
  created () {
  },
  mounted () {
  },
  beforeDestroy () {
    this.popInstance && document.body.removeChild(this.popInstance.vm.$el)
    this.popInstance && this.popInstance.$destroy()
  },
  computed: {
    // imgStyle () {
    //   if () {
    //   }
    //   this.$store.commit('c_ww', window.innerWidth)
    //   this.$store.commit('c_wh', window.innerHeight)
    //   return {
    //   }
    // }
  },
  components: {
  }
}
</script>
<style module lang="scss">
.img{
  cursor: pointer;
  display: block;
  border: none;
}
</style>
