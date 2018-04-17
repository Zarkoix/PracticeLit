import amqp from 'amqplib/callback_api'
import { log } from 'winston'

let testQueueConsumers = []

// use the RMQ environment variable if possible, otherwise default to basing host on NODE_ENV
const host = process.env.RMQ
  ? process.env.RMQ
  : process.env.NODE_ENV === 'production' ? 'rabbitmq' : 'localhost'

let initializeConnection = () => {
  log('info', '[RMQ] initializing on host ' + host)
  return new Promise((resolve, reject) => {
    amqp.connect('amqp://' + host, function (err, conn) {
      if (err) {
        if (err.code === 'ECONNREFUSED') {
          log('warn', 'rabbitmq server cannot be reached @ ' + host + ', trying again in 1s')
          setTimeout(initializeConnection, 1000)
        } else {
          log('error', 'rabbitmq connection error: ' + err.code)
          reject(err)
        }
      } else {
        initializeTestQueue(conn)
        resolve(conn)
      }
    })
  })
}

let initializeTestQueue = (conn) => {
  conn.createChannel(function (err, ch) {
    let testQueue = 'q_tests'
    ch.assertQueue(testQueue, {durable: false})
    log('info', '[RMQ] Waiting for messages in ' + testQueue)
    ch.consume(testQueue, function (msg) {
      for (let i = 0; i < testQueueConsumers.length; i++) {
        testQueueConsumers[i](msg.content.toString())
      }
      ch.ack(msg)
    }, {noAck: false})
  })
}

let initializeChannel = (conn, qName, cb) => {
  conn.createChannel(function (err, ch) {
    ch.assertQueue(qName, {durable: false})
    cb((msg) => ch.sendToQueue(qName, Buffer.from(msg)))
  })
}

export default {
  initializeChannel: initializeChannel,
  initializeConnection: initializeConnection,
  registerNewTestQueueConsumer: (r) => testQueueConsumers.push(r)
}