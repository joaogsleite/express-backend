
const { sh, ssh, runTask, scp, runRemoteTask } = require('./utils')

const keys = Object.keys(process.env).filter((key) => {
  return key.includes('SSH_KEY')
}).map((objKey) => {
  const contents = process.env[objKey]
  const env = objKey.split('SSH_KEY_')[1]
  return { env, contents }
})
const servers = Object.keys(process.env).filter((key) => {
  return key.includes('SSH_DEPLOY')
}).map((objKey) => {
  const value = process.env[objKey]
  const env = objKey.split('SSH_DEPLOY_')[1]
  const user = value.split('@')[0]
  const host = value.split('@')[1].split(':')[0]
  const remotePath = value.split(':')[1]
  const key = keys.find(k => k.env === env)
  return { env, user, host, remotePath, key: key && key.contents }
})

function remote (options, name, taskName, ...args) {
  return runRemoteTask(servers[name], taskName, ...args)
}

function deploy(options, env = 'DEV') {
  
  const server = servers.find(s => s.env === env.toUpperCase())
  if (!server) {
    console.log(`Environment ${env} not found!`)
    console.log(`Setup SSH_DEPLOY_{env} variable in .env file`)
    process.exit(1)
  }

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

function deployDB(options, db = 'mysql', env = 'DEV') {

  const server = servers.find(s => s.env === env.toUpperCase())
  if (!server) {
    console.log(`Environment ${env} not found!`)
    console.log(`Setup SSH_DEPLOY_${env} variable in .env file`)
    process.exit(1)
  }

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
