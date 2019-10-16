
const { sh } = require('tasksfile')
const dotenv = require('dotenv')

dotenv.config()

const defaultOptions = { stdio: 'pipe', nopipe: true }

const shWithKey = (cmd, key, options) => {
  const addKeyCommand = key.includes('.pem')
    ? `ssh-add ${key}`
    : `echo "${key.replace('\n', '\\n')}" | ssh-add /dev/stdin`
  return sh(`
    eval $(ssh-agent -s)
    ${addKeyCommand}
    ${cmd}
    ssh-agent -k
  `, options)
}

const ssh = ({user, host, port = 22, remotePath = './', key}, cmd, options = defaultOptions) => {
  remotePath = remotePath[remotePath.length - 1] === '/'
    ? remotePath
    : remotePath + '/'
  const sshCommand = `ssh -p ${port} ${user}@${host} 'cd ${remotePath}\n${cmd}'`
  if (key) {
    return shWithKey(sshCommand, key, options)
  } else {
    return sh(sshCommand, options)
  }
}

const scp = ({user, host, port = 22, remotePath = './', key}, localFile, remoteFile = '', options = defaultOptions) => {
  remotePath = remotePath[remotePath.length - 1] === '/'
    ? remotePath
    : remotePath + '/'
  const scpCommand = `scp -P ${port} ${localFile} ${user}@${host}:${remotePath}${remoteFile}`
  if (key) {
    return shWithKey(scpCommand, key, options)
  } else {
    return sh(scpCommand, options)
  }
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
