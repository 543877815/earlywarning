export function hasClass(obj, cls){
  var obj_class = obj.className;//获取 class 内容.
  var obj_class_lst = obj_class.split(/\s+/);//通过split空字符将cls转换成数组.
  var x = 0;
  for(x in obj_class_lst) {
    if(obj_class_lst[x] == cls) {//循环数组, 判断是否包含cls
      return true;
    }
  }
  return false;
}
