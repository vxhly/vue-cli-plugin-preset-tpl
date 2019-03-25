// 全局指令、

import Vue from 'vue'

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
