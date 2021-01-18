import dom from './dom.js'
import array from './array.js'
import zIndex from './zIndex.js'
import clone from './clone.js'
import date from './date.js'
import promise from './promise.js'
import asyncValidator from './asyncValidator.js'
var utils = {
  dom: dom,
  array: array,
  zIndex: zIndex,
  clone: clone,
  date: date,
  localStorage: localStorage,
  isSimulationMobile: false,
  asyncValidator: asyncValidator,
  promise: promise,
  getUuid (len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    var uuid = []
    radix = chars.length
    if (len) {
      for (var i = 0; i < len; i++) {
        uuid[i] = chars[0 | Math.random() * radix]
      }
    } else {
      var r = null
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
      uuid[14] = '4'
      for (var j = 0; j < 36; j++) {
        if (!uuid[j]) {
          r = 0 | Math.random() * 16
          uuid[j] = chars[(j === 19) ? (r & 0x3) | 0x8 : r]
        }
      }
    }
    return uuid.join('')
  },
  getParentByComponentName (parent, componentName) { // 根据ComponentName递归获取指定父级组件
    let parentName = parent.$options.componentName
    while (parentName !== componentName) {
      parent = parent.$parent
      if (!parent) {
        break
      }
      parentName = parent.$options.componentName
    }
    return parent
  },
  trim (str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
  },
  simulationMobile () {
    this.isSimulationMobile = true
  },
  isWxwork () {
    const wxworkReg = /wxwork/i
    return wxworkReg.test(navigator.userAgent)
  },
  isMobile () {
    if(this.isSimulationMobile || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return true
    } else {
      return false
    }
  },
  isNullOrUndefined (val) {
    return val === null || val === undefined
  },
  banBodyScroll () {
    document.body.style.overflow = 'hidden'
  },
  removeBanBodyScroll () {
    document.body.style.overflow = 'auto'
  }
}
export default utils
