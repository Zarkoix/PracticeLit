import amqp from 'amqplib/callback_api'
import { log } from 'winston'

let testQueueConsumers = []
amqp.connect('amqp://localhost', function (err, conn) {
  if (err) {
    if (err.code === 'ECONNREFUSED') {
      console.log('rabbitmq server cannot be reached')
    }
    console.log('rabbit error: ')
    console.log(err)
    return
  }
  conn.createChannel(function (err, ch) {
    let qName = 'q_tests'

    ch.assertQueue(qName, {durable: false})
    log('info', '[rabbit] Waiting for messages in ' + qName)
    ch.consume(qName, function (msg) {
      log('info', '[rabbit] Received ' + msg.content.toString())
      for (let i = 0; i < testQueueConsumers.length; i++) {
        testQueueConsumers[i](msg.content.toString())
      }
      // ch.ack(msg)
    }, {noAck: true})
  })
})

export default {
  initialize: function (qName, cb) {
    amqp.connect('amqp://localhost', function (err, conn) {
      if (err) {
        console.log('rabbit error: ')
        console.log(err)
      }
      conn.createChannel(function (err, ch) {
        ch.assertQueue(qName, {durable: false})
        cb((msg) => ch.sendToQueue(qName, Buffer.from(msg)))
      })
      // setTimeout(function() { conn.close(); process.exit(0) }, 500);
    })
  },
  resgisterNewTestQueueConsumer: (r) => testQueueConsumers.push(r)
}