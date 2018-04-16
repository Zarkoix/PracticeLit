import express from 'express'
import rmq from '../rabbitmq'
import ws from '../ws'


const router = express.Router()
let sendToQueue
// this is async so their is a time when sendToQueue is undefined,
// but it theoretically should never be called because server is still booting up
rmq.initializeConnection()
  .then((connection) => rmq.initializeChannel(connection, 'q_submit', (s2q) => sendToQueue = s2q))
  .catch((err) => console.log(err))
rmq.registerNewTestQueueConsumer(function (msg) {
  const parts = msg.split(' ')
  const id = parts.shift()
  const questionID = parts.shift()
  console.log('sending TestInfo to client (' + id + ')')
  const message = {
    type: 'TestInfo',
    questionID: questionID,
    testInfo: JSON.parse(parts.join(' ')) // TODO ensure that the testinfo is not getting parsed and restringified
  }
  ws.send(id, message)
})

/**
 * when 'TestCode' WebSocket data is received send it to the queue
 */
ws.use('TestCode', (msg, { id }) => {
  console.log('received TestCode from client (' + id + ')')
  sendToQueue(id + " " + msg.questionID + " " + msg.code)
  ws.send(id, { // send confirmation packet to the client
    type: 'CodeReceived',
    questionID: msg.questionID
  })
})

router.get('/:content', async (req, res) => {
  // questionID sessionID code
  sendToQueue('0 1 ' + decodeURIComponent(req.params.content))
  return res.status(200).end()
})

export default router
