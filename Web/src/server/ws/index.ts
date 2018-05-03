import * as WebSocket from 'ws'
import { log } from 'winston'

export class WSMessage {
    public type: string
    public payload: any
    constructor(type: string, payload: any) {
      this.type = type
      this.payload = payload
    }

    public toString() {
      return JSON.stringify({type: this.type, payload: this.payload})
    }
}

// route to function map, this currently only allows for one consumer of each
let consumers = new Map<string, (a: WSMessage, b: WebSocket) => void>()

// id to socket map
export default {
  /**
   * starts the WebSocket server on the specified port
   * @param server the express server
   */
  start: function (server: any) {
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
     * set up the websocket connections to pass on messages to neccessary consumers
     */
    wss.on('connection', (ws, req) => {
      log('info', '[WSS] WS connection created')

      /**
       * handles message reception, forwards to appropriate handler, otherwise logs a lack of route for the type
       */
      ws.on('message', (text: string) => {
        let obj = JSON.parse(text)
        let message: WSMessage = new WSMessage(obj.type, obj.payload)
        switch (message.type) {
          /**
           * put any server level types or WS routes here
           */
          /**
           * no server level type on the packet, so let's see if it's addressed to a module
           */
          default: {
            if (consumers.has(message.type)) {
              // is there a type?
              // if so call the wsManager for that module with the packet
              consumers.get(message.type)(message, ws)
            } else {
              log('warn', '[WSS] no route for ' + message.type + ' exists')
            }
          }
        }
      })

      /**
       * a WS lost a connection, so lets remove it from the session map
       */
      ws.on('close', () => {
        log('info', 'closed ws')
      })
    })

    /**
     * TODO reimplement heartbeat protocol for finding dead/lost connections
     * not high priority as during testing a dead connection was never discovered
     */
  },

  /**
   * Registers a function to be called whenever the 'type' field of a received websocket message matches the 'route'
   *
   * @param route the String to match
   * @param f the function to be with the route when the a message for it is received
   */
  use: (route: string, f: (a: WSMessage, b: WebSocket) => void) => {
    if (!consumers.has(route)) {
      log('info', '[WSS] registering route WS route: ' + route)
      consumers.set(route, f)
    } else {
      log('warn', '[WSS] cannot register because another route already exists: ' + route)
    }
  }
}
