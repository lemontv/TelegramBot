const apiURL = 'https://api.telegram.org/bot'
const apiToken = '302150194:AAGku7H_n18-t9hgTLgzc27aNeffqMIi1mk'
const apiBase = `${apiURL}${apiToken}`

const methods = [
  'getMe',
  'getChat',
  'getUpdates',
  'sendMessage'
]

var genMethod = function (method) {
  return `${apiBase}/${method}`
}

var genMethodList = function () {
  var methodList = {}
  for (var method of methods) {
    methodList[method] = `${apiBase}/${method}`
  }
  return methodList
}

module.exports = genMethodList()
