export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 获取input光标位置
 */
export const getPosition = function (element) {
  let cursorPos = 0
  console.log(element.selectionStart)
  if (document.selection) { // IE
    var selectRange = document.selection.createRange()
    selectRange.moveStart('character', -element.value.length)
    cursorPos = selectRange.text.length
  } else if (element.selectionStart || element.selectionStart === '0') {
    cursorPos = element.selectionStart
  }
  return cursorPos
}

/**
 * 数组对象去重
 * 参数1 对象数组
 * 参数2 依据哪个Key去重
 */
export const arrayRept = function (arr, key) {
  const obj = {}
  arr = arr.reduce(function (item, next) {
    if (!obj[next[key]]) {
      obj[next[key]] = true
      item.push(next)
    }
    return item
  }, [])
  return arr
}

/**
 * 计算字符长度 一个中文一个长度 两个英文一个长度
 */
export const stringLength2cn = function (str) {
  if (!str) return 0
  // const reg = /[^\\x00-\\xff]/g
  let len = 0
  for (let i = 0; i < str.length; i++) {
    const c = str.substr(i, 1)
    const ts = escape(c)
    if (ts.substring(0, 2) === '%u') {
      len += 2
    } else {
      len += 1
    }
  }
  return Math.ceil(len / 2)
}





// ---------------------------------       金额处理
/**
 * 金额格式化
 */
export const fmoney = function (msg, n) {
  msg = Math.round((Math.round(msg * 10000) / 10000) * 100) / 100
  n = n > 0 && n <= 20 ? n : 2
  var recordPlusOrMinus = false
  let s = 0
  if (msg < 0) {
    recordPlusOrMinus = true
    s = Math.abs(msg)
  } else {
    recordPlusOrMinus = false
    s = msg
  }
  let str = parseFloat((s + '').replace('/[^\\d\\.-]/g', '')).toFixed(n) + ''
  var l = str.split('.')[0].split('').reverse()
  var r = str.split('.')[1]
  var t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
  }
  if (recordPlusOrMinus === true) {
    return '-' + t.split('').reverse().join('') + '.' + r
  }
  return t.split('').reverse().join('') + '.' + r
}

// 小于一万 转换为元 小于一亿 转换为万元
export const handlerToWanUnit = (money) => {
  let unit = '元'
  let m = money
  if (money < 10000) {
    unit = '元'
    m = money
  } else if (money >= 10000 && money <= 100000000) {
    unit = '万元'
    m = Math.round((money / 10000) * 100) / 100
  } else {
    unit = '亿元'
    m = Math.round((money / 100000000) * 100) / 100
  }
  return {
    money: fmoney(m),
    unit
  }
}