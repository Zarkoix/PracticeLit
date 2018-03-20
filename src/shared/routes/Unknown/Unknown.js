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
const Unknown = ({history}) => (
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
      onClick={() => history.push('/q')}
    />
  </div>
)

Unknown.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Unknown)
