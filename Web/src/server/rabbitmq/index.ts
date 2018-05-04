import { connect, Connection, Message, Channel } from 'amqplib'
import { log } from 'winston'

// use the RMQ environment variable if possible, otherwise default to basing host on NODE_ENV
const host = process.env.RMQ
  ? process.env.RMQ
  : process.env.NODE_ENV === 'production' ? 'rabbitmq' : 'localhost'

export let initializeConnection = (): Promise<Connection> =>
// TODO: test this code for scenarios when rabbitmq is not immediately available
// sometimes TestCode WSS route will not be registered because the returned promise
// does not resolve properly when rabbitmq is not available first try
  new Promise<Connection>((resolve, reject) => {
    log('info', '[RMQ] initializing on host ' + host)
    connect('amqp://' + host)
    .then(connection => {
      resolve(connection)
    })
    .catch(err => {
      if (err.code === 'ECONNREFUSED') {
        log('warn', 'rabbitmq server cannot be reached @ ' + host + ', trying again in 1s')
        setTimeout(() => resolve(initializeConnection()), 1000)
      } else {
        log('error', 'rabbitmq connection error: ' + err.code)
        reject(err)
      }
    })
  })

  /**
   * Registers a consumer to queue
   * @param channel rmq channel to use
   * @param inbound queue name
   * @param consumer function to be called with `Message`
   */
   export let initializeConsumer = (channel: Channel, inbound: string, consumer: (msg: Message) => void) => {
     channel.assertQueue(inbound, { durable: false })
     channel.consume(inbound, consumer)
   }

  /**
   * Registers a consumer to queue
   * @param channel rmq connection to use
   * @param outbound queue name
   * @return function to send messages
   */
  export let sendToQueue = (channel: Channel, outbound: string): ((msg: string) => void) => {
    channel.assertQueue(outbound, { durable: false })
    return (msg: string) => {
      channel.sendToQueue(outbound, Buffer.from(msg))
    }
  }
