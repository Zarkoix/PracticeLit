import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FlatButton from '../../components/GeneralUI/FlatButton'
import { withRouter } from 'react-router-dom'
import { backgroundColor, primaryColor, textColor } from '../../theme/theme'

/**
 * The `App` component is the entry point for the react app.
 * It is rendered on the client as well as on the server.
 *
 * You can start developing your react app here.
 */
class Unknown extends Component {
  render() {
    return (
      <div>
        <div style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          width: '50%',
          marginLeft: '25%',
          color: textColor
        }}>
          <h1>Couldn't Find That Page</h1>
          <FlatButton
            big
            text={"Back to Safety!"}
            color={primaryColor}
            backgroundColor={backgroundColor}
            onClick={() => this.props.history.push('/q')}
          />
        </div>
      </div>
    );
  }
}

Unknown.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Unknown)
