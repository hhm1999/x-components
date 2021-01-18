import dom from '../../utils/dom.js'
let nodeList = []
dom.on(document, 'mousedown', function (e) {
  for (let i = 0; i < nodeList.length; i++) {
    if (!nodeList[i].contains(e.target) &&
        nodeList[i] !== e.target &&
        (!nodeList[i].vnode.context.popperElm || !nodeList[i].vnode.context.popperElm.contains(e.target))) {
      nodeList[i].bindingFn && nodeList[i].bindingFn(e)
    }
  }
})
export default {
  bind (el, binding, vnode) {
    el.bindingFn = binding.value
    el.vnode = vnode
    nodeList.push(el)
  },
  unbind (el) {
    for (let i = 0; i < nodeList.length; i++) {
      if (nodeList[i] === el) {
        nodeList.splice(i, 1)
        break
      }
    }
    delete el.bindingFn
    delete el.vnode
  }
}
