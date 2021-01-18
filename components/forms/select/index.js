import select from './select.vue'
import selectOption from './selectOption.vue'
import selectOptionTip from './selectOptionTip.vue'
export default {
  install: function (Vue) {
    Vue.component(select.name, select)
    Vue.component(selectOption.name, selectOption)
    Vue.component(selectOptionTip.name, selectOptionTip)
  }
}
