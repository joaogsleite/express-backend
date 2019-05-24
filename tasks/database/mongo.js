
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
const PROJECT_ROOT = `${__dirname}/../..`
const MONGO_AUTH = `--authenticationDatabase admin -u ${DB_USER} -p ${DB_PASS}`

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
  if (DOCKER) {
    dockerSh(dockerContainerName, `rm -rf mongodump/ || true`)
    sh(`docker cp ${PROJECT_ROOT}/mongodump/ ${dockerContainerName}:mongodump/`)
    dockerSh(dockerContainerName, `mongorestore --drop -d ${DB_NAME} mongodump/ ${MONGO_AUTH}`)
  } else {
    sh(`mongorestore --drop -d ${DB_NAME} ${PROJECT_ROOT}/mongodump/ ${MONGO_AUTH}`)
  }
}

function backup() {
  if (DOCKER) {
    dockerSh(dockerContainerName, `mongodump --out mongodump/ --db ${DB_NAME} ${MONGO_AUTH}`)
    sh(`docker cp ${dockerContainerName}:mongodump/${DB_NAME}/ ${PROJECT_ROOT}/mongodump/`)
  } else {
    sh(`mongodump --out ${PROJECT_ROOT}/mongodump/ --db ${DB_NAME} ${MONGO_AUTH}`)
  }
}

function shell() {
  const shellOptions = { nopipe: true }
  if (DOCKER) {
    const dockerOptions = { interactive: true }
    dockerSh(dockerContainerName, `mongo ${DB_NAME} ${MONGO_AUTH}`, dockerOptions, shellOptions)
  } else {
    sh(`mongo ${DB_NAME} --host ${DB_HOST} --port ${DB_PORT} ${MONGO_AUTH}`, shellOptions)
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
