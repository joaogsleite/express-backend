
const { sh, runTask, dockerStart, dockerStop, dockerSh } = require('../utils')
const fs = require('fs')

const { 
  DOCKER  = false,
  DB_HOST = '127.0.0.1',
  DB_PORT = 3306,
  DB_NAME,
  DB_USER = 'root',
  DB_PASS,
} = process.env

const dockerContainerName = `mysql-${DB_NAME}`
const PROJECT_ROOT = `${__dirname}/../../`

function deploy(options, server) {
  runTask('deployDB', 'mysql', server)
}

function start() {
  if (DOCKER) {
    dockerStart({
      image: 'mysql:5.6',
      name: dockerContainerName,
      background: true,
      ports: { [DB_PORT]: '3306' },
      envs: { 
        MYSQL_ROOT_PASSWORD: DB_PASS,
        MYSQL_DATABASE: DB_NAME, 
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
  const dump = fs.readFileSync(`${PROJECT_ROOT}/backup.sql`)
  if (DOCKER) {
    sh(`docker cp ${PROJECT_ROOT}/backup.sql ${dockerContainerName}:backup.sql`)
    dockerSh(dockerContainerName, `sh -c "mysql -u ${DB_USER} -p${DB_PASS} ${DB_NAME} < backup.sql"`)
  } else {
    sh(`mysql -h ${DB_HOST} -P ${DB_PORT} -u ${DB_USER} -p${DB_PASS} ${DB_NAME} << EndOfDumpFile\n${dump}\nEndOfDumpFile`)
  }
}

function backup() {
  let dump
  if (DOCKER) {
    dump = dockerSh(dockerContainerName, `mysqldump -u ${DB_USER} -p${DB_PASS} ${DB_NAME} | grep -v "Warning: Using a password"`)
  } else {
    dump = sh(`mysqldump -h ${DB_HOST} -P ${DB_PORT} -u ${DB_USER} -p${DB_PASS} ${DB_NAME} | grep -v "Warning: Using a password"`)
  }
  fs.writeFileSync(`${PROJECT_ROOT}/backup.sql`, dump)
}

function shell() {
  const shellOptions = { nopipe: true }
  if (DOCKER) {
    const dockerOptions = { interactive: true }
    dockerSh(dockerContainerName, `mysql -u ${DB_USER} -p${DB_PASS} ${DB_NAME}`, dockerOptions, shellOptions)
  } else {
    sh(`mysql -h ${DB_HOST} -P ${DB_PORT} -u ${DB_USER} -p${DB_PASS} ${DB_NAME}`, shellOptions)
  } 
}

function exec(options, name) {
  const shellOptions = { nopipe: true }
  const scriptPath = `./tasks/database/scripts/${name}.sql`
  if (DOCKER) {
    const dockerOptions = { interactive: true, tty: false }
    dockerSh(dockerContainerName, `mysql -u ${DB_USER} -p${DB_PASS} ${DB_NAME} < ${scriptPath}`, dockerOptions, shellOptions)
  } else {
    sh(`mysql -h ${DB_HOST} -P ${DB_PORT} -u ${DB_USER} -p${DB_PASS} ${DB_NAME} < ${scriptPath}`, shellOptions)
  } 
}

module.exports = {
  start,
  stop,
  backup,
  restore,
  shell,
  deploy,
  exec,
}
