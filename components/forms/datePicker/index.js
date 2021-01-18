import datePickerRange from './datePickerRange.vue'
import datePickerSingle from './datePickerSingle.vue'
export default {
  install: function (Vue) {
    Vue.component(datePickerRange.name, datePickerRange)
    Vue.component(datePickerSingle.name, datePickerSingle)
  }
}
