import express from 'express'
import rmq from '../rabbitmq'
import ws from '../ws'


const router = express.Router()
let sendToQueue
// this is async so their is a time when sendToQueue is undefined,
// but it theoretically should never be called because server is still booting up
rmq.initialize('q_submit', (s2q) => sendToQueue = s2q)
rmq.registerNewTestQueueConsumer(function (msg) {
  console.log('message from rmq: ' + msg)
  const parts = msg.split(' ')
  const id = parts.shift()
  const questionID = parts.shift()
  const message = {
    type: 'TestInfo',
    questionID: questionID,
    testInfo: JSON.parse(parts.join(' ')) // TODO ensure that the testinfo is not getting parsed and restringified
  }
  ws.send(id, message)
})

router.get('/:content', async (req, res) => {
  // questionID sessionID code
  sendToQueue('0 1 ' + decodeURIComponent(req.params.content))
  return res.status(200).end()
})

export default router
