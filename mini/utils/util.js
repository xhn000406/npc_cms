const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const showToast = (msg, icon = 'loading') => {
  let mTime = 3000
  if (icon === 'loading') mTime = 3000 * 100
  wx.showToast({ title: msg, icon, duration: mTime })
}

const setTabBar = function(pos, key, value) {
  if (typeof pos === 'function' && pos()) {
    pos().setData({
      [key]: value
    })
  }
}

module.exports = {
  formatTime,
  showToast,
  setTabBar
}
