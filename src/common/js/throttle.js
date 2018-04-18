export function throttle(func, wait, options) {
  // 上下文，函数参数，函数返回值
  var context, args, result;
  // 延时器
  var timeout = null;
  // 上一次执行的func的时间点
  var previous = 0;
  if (!options) options = {};
  // 延时执行函数
  var later = function() {
    // 如果及时调用被关闭，则设置previous为0
    previous = options.leading === false ? 0 : _.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  /** 以上变量以及函数都是通过闭包的方式访问的 **/
  return function() {
    var now = _.now();
    if (!previous && options.leading === false) previous = now;
    // remaining容易理解，表示还剩多少时间可以再次执行func
    var remaining = wait - (now - previous);
    // 保存上下文
    context = this;
    // 获取函数参数
    args = arguments;
    // 及时模式
    // remaining小于等于0是跳出wait的限制，可以执行了
    // remaining大于wait的情况，只有在客户机修改了系统时间的时候才会出现
    // 这两种情况都可以立刻对func做调用
    if (remaining <= 0 || remaining > wait) {
      // 清除定时器
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {// 延时模式
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}
