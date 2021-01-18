import checkbox from './checkbox.vue'
import checkboxGroup from './checkboxGroup.vue'
export default {
  install: function (Vue) {
    Vue.component(checkbox.name, checkbox)
    Vue.component(checkboxGroup.name, checkboxGroup)
  }
}
