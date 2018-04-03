import express from 'express'
import rmq from '../rabbitmq'

const router = express.Router()
let sendToQueue
// this is async so their is a time when sendToQueue is undefined,
// but it theoretically should never be called because server is still booting up
rmq.initialize('q_submit', (s2q) => sendToQueue = s2q)
rmq.resgisterNewTestQueueConsumer(function (msg) {
  console.log(msg + ' consumed')
})

router.get('/:content', async (req, res) => {
  // questionID sessionID code
  console.log('req id: ' + req.id)
  console.log('s2q called')
  sendToQueue('1234 1 ' + decodeURIComponent(req.params.content))
  return res.status(200).end()
})

export default router
