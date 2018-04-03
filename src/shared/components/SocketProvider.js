import { Component, Children } from 'react'
import PropTypes from 'prop-types'

/**
 * this class is from Dashb0ard, could probably be abstracted and exposed as a library eventually
 */
class SocketProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      socket: false,
      socketReady: false,
      socketAuth: false
    }
  }

  static propTypes = {
    children: PropTypes.node
  }

  static childContextTypes = {
    socket: PropTypes.object.isRequired,
  }

  types = {}

  componentWillMount() {
    const canUseDOM = typeof window !== 'undefined'
    if (canUseDOM) {
      const socket = new WebSocket('ws://localhost:8080')
      socket.ready = false
      socket.registerType = this.registerType
      this.setState({
        socket: socket,
      })

      socket.onopen = () => {
        socket.ready = true
        this.setState({
          socket: socket,
          socketReady: true
        })
        console.log('connection established')
      }

      socket.onmessage = (event) => {
        let data = JSON.parse(event.data)
        this.types[data.type](data)
      }

      socket.onclose = (err) => {
        console.log(err)
        console.log('connection lost')
      }

      this.setState({
        socket: socket
      })
    }
  }

  registerType = (type, f) => {
    this.types[type] = f
  }

  getChildContext() {
    return {
      socket: this.state.socket
    }
  }

  render() {
    return (
      Children.only(this.props.children)
    )
  }
}

export default SocketProvider;
