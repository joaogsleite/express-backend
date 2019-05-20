
const { sh } = require('./utils')

const BIN = './node_modules/.bin/forever'
const OPTIONS = '-o out.log -e error.log'
const FILE = './build/index.js'

function start() {
  sh(`${BIN} start ${OPTIONS} ${FILE}`)
}

function stop() {
  sh(`${BIN} stop ${OPTIONS} ${FILE}`)
}

function restart() {
  stop()
  start()
}

module.exports = {
  start,
  stop,
  restart,
}
