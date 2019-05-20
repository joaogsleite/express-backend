
// setup dotenv
import 'setup/dotenv'

// setup database
import database from 'setup/database'

// setup http server
import httpServer from 'setup/httpServer'

const { 
  SERVER_PORT = 3001,
  CLEAN_DB = false,
} = process.env

database.sync({ force: CLEAN_DB === 'true' }).then(() => {
  httpServer.listen(Number(SERVER_PORT))
})
