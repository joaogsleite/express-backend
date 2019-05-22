
const { cli } = require('tasksfile')

const deploy = require('./deploy')
const db = require('./db')
const build = require('./build')
const forever = require('./forever')

cli({
  ...deploy,
  ...build,
  forever,
  db,
})

// # ADD THIS TO YOUR .bashrc OR .zshrc FILE:
// task() { npm run task -- $@ }
