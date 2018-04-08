import { Component } from 'react'
import React from 'react'
import PropTypes from 'prop-types'

import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Toast from './GeneralUI/Toast'

/**
 * this class is from Dashb0ard, could probably be abstracted and exposed as a library eventually
 */
class SocketProvider extends Component {
  constructor (props) {
    super(props)
    this.state = {
      socket: {
        registerType: this.registerType
      },
      socketReady: false,
      showToast: false,
      preparingSocket: false
    }
  }

  static propTypes = {
    children: PropTypes.node
  }

  static childContextTypes = {
    socket: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  }

  getChildContext () {
    return {
      socket: this.state.socket
    }
  }

  types = {}

  canUseDOM = () => typeof window !== 'undefined'

  componentDidMount () {
    if (!this.state.socketReady && this.canUseDOM()) { // see if we can use the dom (if we're client side or now)
      console.log('prepare socket from mount')
      this.prepareSocket() //if we're client side we can fully prepare the socket
    }
  }

  prepareSocket = () => {
    if (!this.state.preparingSocket) {
      this.setState({
        preparingSocket: true
      })
      const socket = new WebSocket('ws://localhost:8080')
      socket.registerType = this.registerType

      socket.onopen = () => {
        socket.ready = true
        this.setState({
          socket: socket,
          socketReady: true,
          showToast: true,
          toastMessage: 'Connection Established',
          toastStatusIcon: '👍'
        })

        setTimeout(() => {
          if (this.state.toastMessage === 'Connection Established') { // ensure its not wiping a connection lost message
            this.setState({
              showToast: false,
            })
          }
        }, 2000)
      }

      socket.onmessage = (event) => {
        let data = JSON.parse(event.data)
        this.types[data.type](data)
      }

      socket.onclose = (err) => {
        this.setState({
          socketReady: false,
          preparingSocket: false,
          toastStatusIcon: '🛑',
          toastMessage: 'Connection Lost',
          showToast: true
        })
        this.pollForConnection()
      }
    } else {
      console.log('[ERROR] socket already being prepared')
    }
  }

  pollForConnection() {
    this.prepareSocket()
  }

  registerType = (type, f) => {
    this.types[type] = f
  }

  render () {
    let toast = this.state.showToast
      ? <CSSTransition classNames="toast" timeout={{enter: 400, exit: 300}}>
          <Toast
            text={this.state.toastMessage}
            icon={this.state.toastStatusIcon}
            onClick={() => this.setState({ showToast: false })}
          />
        </CSSTransition>
      : null

    return (
      <div>
        {this.props.children}
        <TransitionGroup>
            {toast}
        </TransitionGroup>
      </div>
    )
  }
}

export default SocketProvider
