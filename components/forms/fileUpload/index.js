import fileUpload from './fileUpload.vue'
export default {
  install: function (Vue) {
    Vue.component(fileUpload.name, fileUpload)
  }
}
