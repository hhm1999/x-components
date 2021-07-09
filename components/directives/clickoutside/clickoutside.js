import dom from '../../utils/dom.js'

const popperElmIscontains = (popperElms, target) => {
  if (popperElms) {
    for (let i = 0; i < popperElms.length; i++) {
      if (popperElms[i].contains(target)) {
        return true;
      }
    }
  }
  return false;
}
let nodeList = []
dom.on(document, 'mousedown', function (e) {
  for (let i = 0; i < nodeList.length; i++) {
    if (!nodeList[i].contains(e.target) &&
        nodeList[i] !== e.target &&
        (!nodeList[i].vnode.context.popperElm || !popperElmIscontains(nodeList[i].vnode.context.popperElm, e.target))) {
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
