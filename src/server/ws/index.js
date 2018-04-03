import WebSocket from 'ws'
import { log } from 'winston'

/**
 * a structure of references to wsManager functions of modules
 {
   moduleName: wsManagerForModule,
 }
 */
let c = {}

export default {
  start: function (server) {
    log('info', '[WSS] WSS initializing')
    /**
     * a structure mapping sessionIDs to their web socket connection
     {
       1: ws1,
       
     }
     */
    const map = {}

    const port = 8080
    const wss = new WebSocket.Server({ server, port })
    log('info', '[WSS] WSS ready on ' + port)

    let nextID = 0
    wss.on('connection', function connection (ws, req) {
      log('info', '[WSS] WS connection created, given ID ' + nextID)
      req.id = nextID
      ws.id = nextID // give the ws an ID
      nextID++ // increment ID pool
      map[ws.id] = ws // place the websocket in the map

      ws.isAlive = true // for use by heartbeat protocol to check status of sockets

      /**
       * according to spec whenever a ws is sent 'ping' it will return pong
       * this is used to check its heartbeat
       */
      ws.on('pong', heartbeat)

      ws.on('message', function incoming (message) {
        message = JSON.parse(message)
        switch (message.type) {
          /**
           * put any server level types or WS routes here
           */
          /**
           * no server level type on the packet, so let's see if it's addressed to a module
           */
          default:
            if (c[message.type]) {
              // is there a type?
              // if so call the wsManager for that module with the packet
              c[message.type](message, ws, map[ws.username])
            } else {
              log('info', '[WSS] no route for ' + message.type + ' exists')
            }
        }
      })

      /**
       * a WS lost a connection, so lets remove it from the session map
       */
      ws.on('close', function close () {
        delete map[ws.id]
      })
    })

    /**
     * called by 'pong' messages
     */
    function heartbeat () {
      this.isAlive = true
    }

    /**
     * poll every connection every once in awhile to make sure they're still alive
     * if they're not lets terminate that connection
     * currently no way to tear down the interval, add 'const interval =' to set to a variable
     */
    setInterval(function ping () {
      wss.clients.forEach(function each (ws) {
        if (ws.isAlive === false) {
          log('info', '[WSS] closing connection, heartbeat lost')
          return ws.terminate()
        }

        ws.isAlive = false
        ws.ping('', false, true)
      })
    }, 30000)
  },

  use: function (route, f) {
    log('info', '[WSS] registering route WS route: ' + route)
    c[route] = f
  }
}
