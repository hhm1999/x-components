import forms from './forms.vue'
export default {
  install: function (Vue) {
    Vue.component(forms.name, forms)
  }
}
