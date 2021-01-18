var zIndex = {
  zIndex: 1000,
  zIndexSecond: 2000,
  zIndexThird: 3000,
  nextZIndex: function () {
    return this.zIndex++
  },
  nextZIndexSecond: function () {
    return this.zIndexSecond++
  },
  nextZIndexThird: function () {
    return this.zIndexThird++
  }
}
export default zIndex
