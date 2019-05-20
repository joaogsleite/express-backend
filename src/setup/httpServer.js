import http from 'http'
import expressServer from './express'

import logger from 'utils/logger'

const log = logger('setup/http')

const { SERVER_PORT = 3001 } = process.env
expressServer.set('port', Number(SERVER_PORT))

const httpServer = http.createServer(expressServer)
export default httpServer
log('server created')

httpServer.on('error', onError)
httpServer.on('listening', onListening)

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  switch (error.code) {
    case 'EACCES':
      log(bind + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      log(bind + ' is already in use')
      process.exit(1)
    default:
      throw error
  }
}

function onListening () {
  const addr = httpServer.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  log('listening on ' + bind)
}
