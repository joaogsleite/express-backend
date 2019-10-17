
const { sh } = require('tasksfile')
const dotenv = require('dotenv')

dotenv.config()

const defaultOptions = { stdio: 'pipe' }

const shWithKey = (cmd, key, options) => {
  if (key) {
    const addKeyCommand = key.includes('.pem')
      ? `ssh-add ${key}`
      : `echo "${key.replace('\n', '\\n')}" | ssh-add /dev/stdin`
    cmd = `
      eval $(ssh-agent -s)
      ${addKeyCommand}
      ${cmd}
      ssh-agent -k
    `
  }
  return sh(cmd, options)
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

const runTask = (...args) => {
  return sh(`npm run task -- ${args.join(' ')}`, defaultOptions)
}

const dockerSh = (name, command, { interactive, tty } = {}, options = defaultOptions) => {
  return sh(`docker exec ${interactive ? (tty !== false ? '-it' : '-i') : ''} ${name} ${command}`, options)
}

const dockerStart = ({image, name, interactive, background, links={}, volumes={}, ports={}, envs={}}, command='', options = defaultOptions) => {
  return sh(`
    docker run \
    ${interactive ? '-it' : ''} \
    ${name ? `--name ${name}` : ''} \
    ${background ? '-d' : ''} \
    ${Object.keys(ports).map(port => `-p ${port}:${ports[port]}`).join(' ')} \
    ${Object.keys(volumes).map(vol => `-v ${vol}:${volumes[vol]}`).join(' ')} \
    ${Object.keys(envs).map(env => `-e ${env}=${envs[env]}`).join(' ')} \
    ${Object.keys(links).map(link => `--link ${link}:${links[link]}`).join(' ')} \
    ${image} ${command}
  `, options)
}

const dockerStop = (name, options = defaultOptions) => {
  return sh(`docker container rm -f ${name} || true`, options)
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
