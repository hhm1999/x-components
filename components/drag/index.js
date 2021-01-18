import drag from './drag.vue'
import dragGroup from './dragGroup.vue'
export default {
  install: function (Vue) {
    Vue.component(drag.name, drag)
    Vue.component(dragGroup.name, dragGroup)
  }
}
