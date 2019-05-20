
const { sh, ssh, runTask, scp, runRemoteTask } = require('./utils')

const servers = {
  dev: { 
    user: 'test',
    host: 'leite.tk',
    remotePath: '~/test',
  },
  uat: { 
    user: 'test',
    host: 'leite.tk',
    remotePath: '~/test',
  },
}

function remote (options, name, taskName, ...args) {
  return runRemoteTask(servers[name], taskName, ...args)
}

function deploy(options, name = 'dev') {
  
  const server = servers[name]

  // zip build folder
  runTask('zip')

  // send build.zip to server
  scp(server, 'build.zip')
  sh('rm -f build.zip')

  // unzip build.zip on server
  ssh(server, `
    rm -rf {build/,tasks/}
    unzip -o build.zip
    rm -f build.zip
  `)

  // restart app
  runRemoteTask(server, 'forever:restart')
}

function deployDB(options, name = 'dev') {

  const server = servers[name]

  // send backup.sql to server
  scp(server, `${__dirname}/db/backup.sql`)

  // restore db from backup.sql
  runRemoteTask(server, 'db:restore')
}

module.exports = {
  deploy,
  deployDB,
  remote,
}
