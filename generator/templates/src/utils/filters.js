// 全局过滤器

import Vue from 'vue'
import moment from 'moment'
import _ from 'lodash'
/**
 * 时间格式化过滤器
 * 使用方法
 * 将当前时间进行格式化 {{ new Date() | dateFormat(pattern) }}
 * pattern 参考 http://momentjs.cn/
 */

Vue.filter('dateFormat', (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(dataStr).format(pattern)
})

/**
 * 大小写转化过滤器
 * 使用方法
 * 字符串全部转成大写 {{ str | toUpper }}
 * 字符串全部转成小写 {{ str | toLower }}
 * 字符串的每个单词的首字母大写，其他小写 {{ str | EF2U }}
 * 字符串的第一个单词的首字母大写，其他小写 {{ str | F2U }}
 */

Vue.filter('toUpper', str => {
  return str.toUpperCase()
})

Vue.filter('toLower', str => {
  return str.toLowerCase()
})

Vue.filter('EF2U', str => {
  return str.toLowerCase().replace(/( |^)[a-z]/g, item => item.toUpperCase())
})

Vue.filter('F2U', str => {
  return str.toLowerCase().charAt(0).toUpperCase() + str.slice(1)
})

/**
 * 人民币大写转换过滤器，精确到分
 * 使用方法
 * 将阿拉伯数字转换成中文大写、人民币大写 {{ str | number2U }}
 */

Vue.filter('number2U', num => {
  if (isNaN(num)) {
    return ''
  }

  let fraction = ['角', '分']
  let digit = [
    '零', '壹', '贰', '叁', '肆',
    '伍', '陆', '柒', '捌', '玖'
  ]
  let unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ]
  let head = Number(num) < 0 ? '欠' : ''
  let n = Math.abs(Number(num))
  let str = ''
  // 处理小数部分，只是精确到 分
  for (let i = 0; i < fraction.length; i++) {
    // 小数部分会出现 0 的情况，0 不进行转换
    str += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
  }
  str = str || '整'
  // 处理整数部分
  n = Math.floor(n)
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = ''
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p
      n = Math.floor(n / 10)
    }
    // 将多余生成的零删除
    str = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + str
  }

  return head + str.replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整')
})

/**
 * JSON 格式化过滤器
 * 使用方法
 * <pre><code>{{ josnObject | json }}</code></pre>
 *
 * space: 用什么来进行分隔；
 *     1）如果省略，直接输出。
 *     2）如果为数字，就缩进几个字符，最大值为10。
 *     3）如果为转义字符，比如“\t”，表示每行一个回车。
 *     4）如果为字符串，在每行输出值的时候把这些字符串附加上去，字符串长度最大为10。
 */

Vue.filter('json', (jsonStr, space = 2) => {
  return _.isObject(jsonStr) || _.isArray(jsonStr)
    ? JSON.stringify(jsonStr, null, space) : '不是正确的 JSON 字符串'
})
