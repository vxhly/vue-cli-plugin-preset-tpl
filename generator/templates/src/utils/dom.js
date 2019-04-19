
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  }
  return function (element, event, handler) {
    if (element && event && handler) {
      element.attachEvent(`on${event}`, handler)
    }
  }
}())

export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  }
  return function (element, event, handler) {
    if (element && event) {
      element.detachEvent(`on${event}`, handler)
    }
  }
}())

export const once = function (el, event, fn) {
  const listener = function () {
    if (fn) {
      fn.apply(this, [el, event, fn])
    }
    off(el, event, listener)
  }
  on(el, event, listener)
}
