export const name = 'formatTime';

/**
 * 格式化时间
 * 
 * @param {string|number|Date} timestamp 时间戳
 * @param {string=} format 时间格式
 * @returns {string}
 */
export default function (timestamp, format = 'yyyy-MM-dd hh:mm:ss') {
  const date = new Date(timestamp);
  let time = format;
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  };

  if (/(y+)/.test(time)) {
    time = time.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(time)) {
      time = time.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return time;
}