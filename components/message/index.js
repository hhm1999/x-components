import zIndex from '../utils/zIndex.js'
export default {
  install: function (Vue) {
    let instanceArray = []
    var message = function (options) {
      let instance = null
      let top = 20
      // let locationIndex = 0
      if (instanceArray.length > 0) {
        for (let index = 0; index < instanceArray.length; index++) {
          if (instanceArray[index].open_getVisible()) {
            top = top + 15 + instanceArray[index].open_getHeight()
            // locationIndex ++
          } else {
            if (!instance) {
              instance = instanceArray[index]
            }
          }
        }
      }
      options = options || {}
      if (typeof options === 'string') {
        options = {
          message: options
        }
      }
      if (!instance) {
        let MessageConstructor = Vue.extend(require('./message.vue').default)
        instance = new MessageConstructor()
        instance.vm = instance.$mount()
        instance.vm.visible = true
        if (options.highestZIndex) {
          instance.vm.$el.style.zIndex = zIndex.nextZIndexThird()
        } else {
          instance.vm.$el.style.zIndex = zIndex.nextZIndex()
        }
        document.body.appendChild(instance.vm.$el)
        instanceArray.push(instance)
        instance.vm.$on('hide', function (top) { // top, height
          // console.log('隐藏的top：' + top)
          // console.log('隐藏的height：' + height)
          let topCumulative = top
          for (let index = 0; index < instanceArray.length; index++) {
            if (instanceArray[index].open_getVisible() && instanceArray[index].open_isAdjustPosition(topCumulative)) {
              instanceArray[index].open_adjustPosition(topCumulative)
              topCumulative = topCumulative + 15 + instanceArray[index].open_getHeight()
            }
          }
        })
      }
      instance.open_setData(options)
      instance.open_show(top)
    }
    Vue.prototype.$message = message
  }
}
