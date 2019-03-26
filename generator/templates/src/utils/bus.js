/**
 * eventsBus 仅使用于同一路由下的复杂组件的通信
 */
/**
 * 使用例子
 *
 * https://codesandbox.io/s/pp8wl2r86q
 */

import Vue from 'vue'

const bus = new Vue({})

let _on = bus.$on
let _emit = bus.$emit
let _off = bus.$off

bus.$on = (name, fn) => {
  if (bus._events[name]) {
    bus.$off(name)
  }
  _on.call(bus, name, fn)
}
bus.$off = (name) => {
  if (name && bus._events[name]) {
    _off.call(bus, name)
  }
}
bus.$emit = (name, params) => {
  // 需要声明数据来源和去向
  if (!params || (!params.from && !params.to)) {
    console.warn && console.warn('The paramter(from and to) is null')
  }
  _emit.call(bus, name, params)
}

export default bus
