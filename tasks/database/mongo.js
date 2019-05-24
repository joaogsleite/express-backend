
const { sh, runTask, dockerStart, dockerStop, dockerSh } = require('../utils')
const fs = require('fs')

const { 
  DOCKER  = false,
  DB_HOST = '127.0.0.1',
  DB_PORT = 27017,
  DB_NAME,
  DB_USER = 'root',
  DB_PASS,
} = process.env

const dockerContainerName = `mongo-${DB_NAME}`

function deploy(options, server) {
  runTask('deployDB', server)
}

function start() {
  if (DOCKER) {
    dockerStart({
      image: 'mongo',
      name: dockerContainerName,
      background: true,
      ports: { [DB_PORT]: 27017 },
      envs: { 
        MONGO_INITDB_ROOT_USERNAME: DB_USER,
        MONGO_INITDB_ROOT_PASSWORD: DB_PASS,
      }
    })
  } else {
    console.log('set DOCKER=true and DB_... variables on .env file')
  }
}
function stop() {
  if (DOCKER) {
    dockerStop(dockerContainerName)
  } else {
    console.log('set DOCKER=true and DB_... variables on .env file')
  }
}

function restore() {
  const dump = fs.readFileSync(`${__dirname}/backup.mongo`)
  if (DOCKER) {
    sh(`docker cp ${__dirname}/backup.mongo ${dockerContainerName}:backup.mongo`)
    dockerSh(dockerContainerName, `not implemented yet!`)
  } else {
    sh(`not implemented yet!`)
  }
}

function backup() {
  let dump
  if (DOCKER) {
    dump = dockerSh(dockerContainerName, `echo "not implemented yet!"`)
  } else {
    dump = sh(`echo "not implemented yet!`)
  }
  fs.writeFileSync(`${__dirname}/backup.mongo`, dump)
}

function shell() {
  const shellOptions = { nopipe: true }
  const auth = `--authenticationDatabase admin -u ${DB_USER} -p ${DB_PASS}`
  if (DOCKER) {
    const dockerOptions = { interactive: true }
    dockerSh(dockerContainerName, `mongo ${DB_NAME} ${auth}`, dockerOptions, shellOptions)
  } else {
    sh(`mongo ${DB_NAME} --host ${DB_HOST} --port ${DB_PORT} ${auth}`, shellOptions)
  } 
}

module.exports = {
  start,
  stop,
  backup,
  restore,
  shell,
  deploy,
}
