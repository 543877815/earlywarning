import {hasClass} from "./hasClass";

export function addClass(ele, cls) {
  if (!hasClass(elem, cls)) {
    ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
  }
}
