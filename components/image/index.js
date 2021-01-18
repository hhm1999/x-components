import image from './image.vue'
export default {
  install: function (Vue) {
    Vue.component(image.name, image)
  }
}
