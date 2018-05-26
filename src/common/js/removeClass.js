import {hasClass} from './hasClass'

export function removeClass (ele, cls) {
  if (hasClass(elem, cls)) {
    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' '
    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
      newClass = newClass.replace(' ' + cls + ' ', ' ')
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '')
  }
}
