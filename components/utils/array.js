var utils = {
  merge: function (arr1, arr2) {
    var arr = []
    if (arr1) {
      for (let i = 0; i < arr1.length; i++) {
        arr.push(arr1[i])
      }
    }
    if (arr2) {
      for (let i = 0; i < arr2.length; i++) {
        arr.push(arr2[i])
      }
    }
    return arr
  },
  isArray: function (o) {
    if (o) {
      return typeof o === 'object' && this.objToStr(o) === '[object Array]'
    }
    return false
  },
  objToStr: function (o) {
    return Object.prototype.toString.call(o)
  }
}
export default utils
