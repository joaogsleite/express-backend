
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

function deployDB(options, db = 'mysql', name = 'dev') {

  const server = servers[name]

  // send dump files to server
  switch (db){
    case 'mongo':
      scp(server, `${__dirname}/../mongodump/`)
      break
    case 'mysql':
    default:
      scp(server, `${__dirname}/../backup.sql`)
      break
  }

  // restore db from dump files
  runRemoteTask(server, `${db}:restore`)
}

module.exports = {
  deploy,
  deployDB,
  remote,
}
