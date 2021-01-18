import number from './number.vue'
export default {
  install: function (Vue) {
    Vue.component(number.name, number)
  }
}
