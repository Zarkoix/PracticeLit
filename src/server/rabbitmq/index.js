import amqp from 'amqplib/callback_api';

export default {
  initialize: function (qName, cb) {
    amqp.connect('amqp://localhost', function(err, conn) {
      conn.createChannel(function(err, ch) {
        ch.assertQueue(qName, {durable: false});
        cb((msg) => ch.sendToQueue(qName, Buffer.from(msg)));
      });
      // setTimeout(function() { conn.close(); process.exit(0) }, 500);
    });
  }
}