import randomUniqueValue from './randomUniqueValue.vue'
export default {
  install: function (Vue) {
    Vue.component(randomUniqueValue.name, randomUniqueValue)
  }
}
