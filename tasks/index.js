
const { cli } = require('tasksfile')

const mysql = require('./database/mysql')
const mongo = require('./database/mongo')

const deploy = require('./deploy')
const build = require('./build')
const forever = require('./forever')

cli({
  ...deploy,
  ...build,
  forever,
  mysql,
  mongo,
})

// # ADD THIS TO YOUR .bashrc OR .zshrc FILE:
// task() { npm run task -- $@ }
