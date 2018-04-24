import * as express from 'express'
import * as rmq from '../rabbitmq/index'
import ws, { WSMessage } from '../ws/index'
import { Connection } from 'amqplib';
import WebSocket from 'ws'

const router = express.Router()
let processMessage: (a: string) => Promise<String>
// this is async so their is a time when sendToQueue is undefined,
// but it theoretically should never be called because server is still booting up
const inbound = 'q_results'
const outbound = 'q_code'
rmq.initializeConnection()
  .then(connection => {
    /**
     * send messages to JTR in queue 'q_code'
     * expect messages back on 'q_results
     */
    connection.createChannel().then(channel => {
      let s2q = rmq.sendToQueue(channel, outbound)
      /**
       * when 'TestCode' WebSocket data is received send it to the queue
       */
      let nextSubmissionID = 0
      let wsMap = new Map<number, WebSocket>();
      ws.use('TestCode', (msg: WSMessage, ws: WebSocket) => {
        console.log('received TestCode from client')

        wsMap.set(nextSubmissionID, ws)
        ws.send(new WSMessage('CodeReceived', ''))
        s2q(nextSubmissionID + ' ' + msg.payload.questionID + ' ' + msg.payload.code)

        nextSubmissionID++ // increment submission ID to prevent conflicts

        rmq.initializeConsumer(channel, inbound, (msg) => {
          const parts = msg.content.toString('utf-8').split(' ')
          const submissionID: number =   Number.parseInt(parts.shift())
          const questionID = parts.shift()
          if (wsMap.has(submissionID)) {
            console.log('sending TestInfo to client')
            const message = new WSMessage(
              'TestInfo',
              {
                questionID: questionID,
                testInfo: JSON.parse(parts.join(' ')) // TODO ensure that the testinfo is not getting parsed and restringified  
              }
            )
            wsMap.get(submissionID).send(message.toString)
            wsMap.delete(submissionID)
          } else {
            console.log('desync in submission ID')
          }
        })
        // send confirmation packet to the client
      })

      
    })
  })
  .catch(err => console.log(err))

export default router
