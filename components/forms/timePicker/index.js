import timePickerRange from './timePickerRange.vue'
import timePickerSingle from './timePickerSingle.vue'
export default {
  install: function (Vue) {
    Vue.component(timePickerRange.name, timePickerRange)
    Vue.component(timePickerSingle.name, timePickerSingle)
  }
}
