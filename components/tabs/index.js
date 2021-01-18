import tabs from './tabs.vue'
import tabPane from './tabPane.vue'
export default {
  install: function (Vue) {
    Vue.component(tabPane.name, tabPane)
    Vue.component(tabs.name, tabs)
  }
}
