import express from 'express';
import repository from './repository';

const router = express.Router();

/**
 * Includes the /api routes as a middleware.
 * The api routes will be accessible from /api/ inside the browser.
 */
router.use('/r', repository);

export default router;
