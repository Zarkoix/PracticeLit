import React from "react";
import PropTypes from 'prop-types'
import { withRouter } from "react-router-dom";
import FlatButton from '../components/GeneralUI/FlatButton'
import { backgroundColor, primaryColor, textColor } from '../theme/theme'

const Landing = ({history}) =>
  <div
    style={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",
      width: "50%",
      marginLeft: "25%",
      color: textColor
    }}
  >
    <h1>Welcome to PracticeLit🔥</h1>
    <FlatButton
      big
      text={"To Directory!"}
      color={primaryColor}
      backgroundColor={backgroundColor}
      onClick={() => history.push("/q")}
    />
  </div>

Landing.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(Landing);
