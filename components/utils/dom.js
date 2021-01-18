let scrollBarWidth
let textPlaceholderDom
var utils = {
  on: (function () {
    if (document.addEventListener) {
      return function (element, event, handler) {
        if (element && event && handler) {
          element.addEventListener(event, handler, false)
        }
      }
    } else {
      return function (element, event, handler) {
        if (element && event && handler) {
          element.attachEvent('on' + event, handler)
        }
      }
    }
  })(),
  remove: (function () {
    if (document.removeEventListener) {
      return function (element, event, handler) {
        if (element && event && handler) {
          element.removeEventListener(event, handler)
        }
      }
    } else {
      return function (element, event, handler) {
        if (element && event && handler) {
          element.detachEvent('on' + event, handler)
        }
      }
    }
  })(),
  getParentByAttribute: function (el, attribute, val) { // 获取有指定属性值的父节点
    let parent = el.offsetParent
    if (!parent) {
      return null
    }
    if (val === undefined) {
      val = ''
    }
    while (parent.getAttribute(attribute) !== val) {
      parent = parent.offsetParent
      if (!parent) {
        return null
      }
    }
    return parent
  },
  getChildByAttribute: function (el, attribute, val) { // 获取有指定属性值的子节点
    if (val === undefined) {
      val = ''
    }
    var allChildNodes = []
    this.getParentByAttributeRecursive(el, allChildNodes)
    for (var i = 0; i < allChildNodes.length; i++) {
      if (allChildNodes[i].getAttribute && allChildNodes[i].getAttribute(attribute) === val) {
        return allChildNodes[i]
      }
    }
    return null
  },
  getParentByAttributeRecursive: function (el, els) {
    if (el && el.childNodes) {
      for (var i = 0; i < el.childNodes.length; i++) {
        els.push(el.childNodes[i])
        this.getParentByAttributeRecursive(el.childNodes[i], els)
      }
    }
  },
  getLocationRelativeParent: function (el, tagParent) {
    let parent = el.offsetParent
    let info = {
      left: el.offsetLeft,
      top: el.offsetTop,
      bottom: tagParent.offsetHeight - el.offsetTop,
      right: tagParent.offsetWidth - el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight,
      topSpace: 0,
      bottomSpace: 0
    }
    while (parent !== tagParent) {
      info.left += parent.offsetLeft
      info.top += parent.offsetTop
      info.bottom -= parent.offsetTop
      info.right -= parent.offsetLeft
      parent = parent.offsetParent
      if (!parent) {
        break
      }
    }
    info.bottom -= (this.hasHorizontalScrollbar(tagParent) ? this.getScrollBarWidth() : 0)
    info.right -= (this.hasVerticalScrollbar(tagParent) ? this.getScrollBarWidth() : 0)
    info.topSpaceWindow = el.getBoundingClientRect().top
    info.topSpace = info.top - tagParent.scrollTop
    info.leftSpaceWindow = el.getBoundingClientRect().left
    info.leftSpace = info.left - tagParent.scrollLeft
    info.bottomSpaceWindow = window.innerHeight - el.getBoundingClientRect().top - info.height
    info.bottomSpace = info.bottomSpaceWindow - (window.innerHeight - tagParent.getBoundingClientRect().top - tagParent.offsetHeight)
    // info.bottom = tagParent.offsetHeight - (el.getBoundingClientRect().top - tagParent.getBoundingClientRect().top)
    info.rightSpaceWindow = window.innerWidth - el.getBoundingClientRect().left - info.width
    info.rightSpace = info.rightSpaceWindow - (window.innerWidth - tagParent.getBoundingClientRect().left - tagParent.offsetWidth)
    return info
  },
  getLocationRelativeWindow: function (el) {
    var rect = el.getBoundingClientRect()
    return {
      left: rect.left + this.getScrollLeft(),
      top: rect.top + this.getScrollTop(),
      bottom: window.innerHeight - (this.hasHorizontalScrollbar() ? this.getScrollBarWidth() : 0) - rect.top - this.getScrollTop(),
      right: window.innerWidth - (this.hasVerticalScrollbar() ? this.getScrollBarWidth() : 0) - rect.left - this.getScrollLeft(),
      width: el.offsetWidth,
      height: el.offsetHeight,
      topSpace: rect.top,
      leftSpace: rect.left,
      bottomSpace: window.innerHeight - rect.top - el.offsetHeight,
      rightSpace: window.innerWidth - rect.left - el.offsetWidth
    }
  },
  getScrollTop: function () {
    if (document.documentElement.scrollTop) {
      return document.documentElement.scrollTop
    } else {
      return document.body.scrollTop
    }
  },
  getScrollLeft: function () {
    if (document.documentElement.scrollLeft) {
      return document.documentElement.scrollLeft
    } else {
      return document.body.scrollLeft
    }
  },
  hasHorizontalScrollbar: function(dom) {
    if (dom) {
      return dom.scrollWidth > dom.clientWidth
    } else {
      return document.body.scrollWidth > (window.innerWidth || document.documentElement.clientWidth)
    }
  },
  hasVerticalScrollbar: function(dom) {
    if (dom) {
      return dom.scrollHeight > dom.clientHeight
    } else {
      return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)
    }
  },
  getScrollBarWidth: function () {
    if (scrollBarWidth !== undefined) return scrollBarWidth

    const outer = document.createElement('div')
    outer.className = 'el-scrollbar__wrap'
    outer.style.overflow = 'scroll'
    outer.style.visibility = 'hidden'
    outer.style.width = '100px'
    outer.style.position = 'absolute'
    outer.style.top = '-9999px'
    document.body.appendChild(outer)

    const widthNoScroll = outer.offsetWidth
    outer.style.overflow = 'scroll'

    const inner = document.createElement('div')
    inner.style.width = '100%'
    outer.appendChild(inner)

    const widthWithScroll = inner.offsetWidth
    outer.parentNode.removeChild(outer)
    scrollBarWidth = widthNoScroll - widthWithScroll
    return scrollBarWidth
  },
  getTextPlaceholderSize (text, style) {
    if (!textPlaceholderDom) {
      textPlaceholderDom = document.createElement('div')
      document.body.appendChild(textPlaceholderDom)
    }
    textPlaceholderDom.innerText = text
    if (style) {
      for(let key in style){
        textPlaceholderDom.style[key] = style[key]
      }
    }
    textPlaceholderDom.style.display = 'inline'
    return textPlaceholderDom.offsetWidth
  },
  getToElement: function (event) {
    if (event.relatedTarget) {
      return event.relatedTarget
    } else if (event.toElement) {
      return event.toElement
    } else if (event.fromElement) {
      return event.fromElement
    } else {
      return null
    }
  },
  scrollTop: function (el, from = 0, to, duration = 500, endCallback) {
    if (!to && to !== 0) {
      return
    }
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = (
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          return window.setTimeout(callback, 1000/60)
        }
      )
    }
    const difference = Math.abs(from - to)
    const step = Math.ceil(difference / duration * 50)

    function scroll(start, end, step) {
      if (start === end) {
        endCallback && endCallback()
        return
      }

      let d = (start + step > end) ? end : start + step
      if (start > end) {
        d = (start - step < end) ? end : start - step
      }

      if (el === window) {
        window.scrollTo(d, d)
      } else {
        el.scrollTop = d
      }
      window.requestAnimationFrame(() => scroll(d, end, step))
    }
    scroll(from, to, step)
  }
}
export default utils
