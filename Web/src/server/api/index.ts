import * as express from 'express'
import repository from './repository'
import submit from './submit'

const router = express.Router()

/**
 * Includes the /api routes as a middleware.
 * The api routes will be accessible from /api/ inside the browser.
 */
router.use('/r', repository)
router.use('/submit', submit)

export default router

