
const { sh } = require('tasksfile')
const dotenv = require('dotenv')

dotenv.config()

const defaultOptions = { stdio: 'pipe' }

const ssh = ({user, host, port = 22, remotePath = './'}, cmd, options = defaultOptions) => {
  return sh(`ssh -p ${port} ${user}@${host} 'cd ${remotePath}\n${cmd}'`, options)
}

const scp = ({user, host, port = 22, remotePath = './'}, localFile, remoteFile = '', options = defaultOptions) => {
  return sh(`scp -P ${port} ${localFile} ${user}@${host}:${remotePath}/${remoteFile}`, options)
}

const runRemoteTask = (server, taskName, ...args) => {
  return ssh(server, `npm run task -- ${taskName} ${args.join(' ')}`, defaultOptions)
}

const runTask = (taskName, options = defaultOptions) => {
  return sh(`npm run task -- ${taskName}`, options)
}

const dockerSh = (name, command, { interactive, tty } = {}, options = defaultOptions) => {
  return sh(`docker exec ${interactive ? (tty !== false ? '-it' : '-i') : ''} ${name} ${command}`, options)
}

const dockerStart = ({image, name, interactive, background, volumes={}, ports={}, envs={}}, command='', options = defaultOptions) => {
  return sh(`
    docker run \
    ${interactive ? '-it' : ''} \
    ${name ? `--name ${name}` : ''} \
    ${background ? '-d' : ''} \
    ${Object.keys(ports).map(port => `-p ${port}:${ports[port]}`).join(' ')} \
    ${Object.keys(volumes).map(vol => `-v ${vol}:${volumes[vol]}`).join(' ')} \
    ${Object.keys(envs).map(env => `-e ${env}=${envs[env]}`).join(' ')} \
    ${image} ${command}
  `, options)
}

const dockerStop = (name, options = defaultOptions) => {
  return sh(`docker container rm -f ${name}`, options)
}

module.exports = {
  sh,
  ssh,
  scp,
  runTask,
  runRemoteTask,
  dockerSh,
  dockerStart,
  dockerStop,
}
