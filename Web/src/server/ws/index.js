import WebSocket from 'ws'
import { log } from 'winston'

/**
 * a structure of references to wsManager functions of modules
 {
   moduleName: wsManagerForModule,
 }
 */
let c = {}
let map = {}

export default {
  /**
   * starts the WebSocket server on the specified port
   * @param server the express server
   * @param port the port to run it on
   */
  start: function (server) {
    log('info', '[WSS] WSS initializing')
    /* a structure mapping sessionIDs to their web socket connection
       {
         1: WebSocket,
       }
     */

    const wss = new WebSocket.Server({ server: server })
    log('info', '[WSS] WSS ready')

    let nextID = 0

    /**
     * when a connection is created give it an ID and store it in the map based on its ID, increment the nextID and
     * setup the necessary heartbeat and message callbacks for it
     */
    wss.on('connection', function connection (ws, req) {
      log('info', '[WSS] WS connection created, given ID ' + nextID)
      req.id = nextID
      ws.id = nextID // give the ws an ID
      // TODO revert id fix when ids are properly allocated
      // nextID++ // increment ID pool
      map[ws.id] = ws // place the websocket in the map based on its session id

      ws.isAlive = true // for use by heartbeat protocol to check status of sockets

      /**
       * according to spec whenever a ws is sent 'ping' it will return pong
       * this is used to check its heartbeat
       */
      ws.on('pong', heartbeat)

      /**
       * handles message reception, forwards to appropriate handler, otherwise logs a lack of route for the type
       */
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
              c[message.type](message, ws)
            } else {
              log('info', '[WSS] no route for ' + message.type + ' exists')
            }
        }
      })

      /**
       * a WS lost a connection, so lets remove it from the session map
       */
      ws.on('close', function close () {
        console.log('closed ws id ' + ws.id)
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

  /**
   * sends a message to a specific ws based on a session ID
   *
   * @param id the session to send a message to
   * @param message the message, which will be Stringify'd
   */
  send: function (id, message) {
    if (map[id]) {
      map[id].send(JSON.stringify(message))
    } else {
      console.log('message lost, ' + id + ' disconnected before server\'s response')
    }
  },

  /**
   * Registers a function to be called whenever the 'type' field of a received websocket message matches the 'route'
   *
   * @param route the String to match
   * @param f the function to be with the route when the a message for it is received
   */
  use: function (route, f) {
    log('info', '[WSS] registering route WS route: ' + route)
    c[route] = f
  }
}
