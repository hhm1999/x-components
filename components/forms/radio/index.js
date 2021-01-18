import radio from './radio.vue'
import radioGroup from './radioGroup.vue'
export default {
  install: function (Vue) {
    Vue.component(radio.name, radio)
    Vue.component(radioGroup.name, radioGroup)
  }
}
