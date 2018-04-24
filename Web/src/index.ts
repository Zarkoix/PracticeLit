import express from 'express'
import { join } from 'path'
import { log } from 'winston'

import ws from './server/ws/index'
import api from './server/api/index'

/**
 * configure server port, attempt to use PORT environment variable, otherwise default to 80
 */
const defaultPort: number = 80
let port: number
if (!process.env.PORT) {
  log('info', 'no port provided, starting server on ' + defaultPort)
  port = defaultPort
} else {
  port = Number.parseInt(process.env.PORT)
  log('info', 'starting server on port ' + port)
}

/**
 * configure node env, attempt to use NODE_ENV environment variable, otherwise default to 'production'
 */
let isProduction
if (process.env.NODE_ENV) {
  isProduction = process.env.NODE_ENV.toUpperCase().includes('PROD')
  log('info', 'NODE_ENV is ' + process.env.NODE_ENV + ' which evaluates isProduction to ' + isProduction)
} else {
  log('info', 'No NODE_ENV found, defaulting to production')
  isProduction = true
}

/**
 * Configures hot reloading and assets paths for local development environment.
 * Use the `npm start` command to start the local development server.
 *
 * @param app Express app
 */
const configureDevelopment = (app: express.Application) => {
  const clientConfig = require('../webpack/client')
  const serverConfig = require('../webpack/server')
  const publicPath = clientConfig.output.publicPath
  const outputPath = clientConfig.output.path
 
  const multiCompiler = require('webpack')([clientConfig, serverConfig])
  const clientCompiler = multiCompiler.compilers[0]

  app.use(require('webpack-dev-middleware')(multiCompiler, {publicPath}))
  app.use(require('webpack-hot-middleware')(clientCompiler))

  app.use(publicPath, express.static(outputPath))

  app.use(require('webpack-hot-server-middleware')(multiCompiler, {
    serverRendererOptions: {outputPath}
  }))

  app.set('views', join(__dirname, '../public/views'))
}

/**
 * Configures assets paths for production environment.
 * This environment is used in deployment and inside the docker container.
 * Use the `npm run build` command to create a production build.
 *
 * @param app Express app
 */
const configureProduction = (app: express.Application) => {
  const clientStats = require('./assets/stats.json')
  const serverRender = require('./assets/app.server.js').default
  const publicPath = '/'
  const outputPath = join(__dirname, 'assets')

  app.use(publicPath, express.static(outputPath))
  app.use(serverRender({
    clientStats,
    outputPath
  }))

  app.set('views', join(__dirname, 'views'))
}

const app = express()

/**
 * Includes the API/express routes as a middleware to enable express routing.
 * Important: this has to be done before the react routes are configured,
 * since the react router is supposed to handle all other requests that are
 * not handles by an api.
 */
log('info', 'Configuring express routes...')
app.use('/api', api)

log('info', `Configuring server for environment: ${isProduction ? 'production' : 'development'}...`)
if (isProduction) {
  configureProduction(app)
} else {
  configureDevelopment(app)
}

log('info', 'Configuring server engine...')
app.set('view engine', 'ejs')
app.set('port', port)

let server = app.listen(app.get('port'), () => {
  log('info', `Server listening on port ${app.get('port')}...`)
  ws.start(server)
})


