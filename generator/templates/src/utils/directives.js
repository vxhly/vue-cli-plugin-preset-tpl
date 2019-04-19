// 全局指令、

import Vue from 'vue'
import { on, once } from './dom'

/**
 * 选中即复制指令
 * 使用方法
 * <div v-copy>test</div>
 */
Vue.directive('copy', el => {
  el.onclick = () => {
    let text = ''
    // 获取选中的内容
    if (window.getSelection) {
      text = window.getSelection()
    } else if (document.selection) {
      text = document.selection.createRange()
    }
    console.log(text.toString())

    // 执行浏览器的复制命令
    document.execCommand('Copy', text)
  }
})

/**
 * 防止抖动，多次点击造成的多次请求
 * 使用方法
 * <button v-repeat-click="handlerClick">按钮</button>
 */
Vue.directive('repeat-click', (el, binding, vnode) => {
  let interval = null
  let startTime
  const handler = () => vnode.context[binding.expression].apply()
  const clear = () => {
    if (new Date() - startTime < 100) {
      handler()
    }
    clearInterval(interval)
    interval = null
  }

  on(el, 'mousedown', (e) => {
    if (e.button !== 0) return
    startTime = new Date()
    once(document, 'mouseup', clear)
    clearInterval(interval)
    interval = setInterval(handler, 100)
  })
})
