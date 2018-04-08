import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { backgroundColor as themeBackgroundColor, textColor as themeTextColor } from '../../theme/theme'

const Toast = ({ className, text, icon, onClick,
                 color = "green",
                 textColor = themeTextColor,
                 backgroundColor = themeBackgroundColor
}) =>
  <div className={className + ' toast'} onClick={onClick} style={{
    color: textColor,
    backgroundColor: backgroundColor,
    border: '1px solid ' + color
  }}>
    {icon && <div className="toast__icon">{icon}</div>}
    <div className="toast__text">{text}</div>
  </div>

Toast.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  color: PropTypes.string,
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string,
}

export default styled(Toast)`
  display: flex;
  flex-direction: row;
  position: fixed;
  z-index: 5;
  height: 50px;
  
  cursor: pointer;
  
  &.toast-enter {
    transform: translateY(500%);
    transition: transform 0.4s ease-in-out;
  }
  
   &.toast-enter-active {
    transform: translateY(0);
  }
  
  &.toast-exit {
    transition: transform 0.3s ease-in-out;
  }
  
  &.toast-exit-active {
    transform: translateY(500%);
  }
  
  left: 15px;
  bottom: 45px;
  border-radius: 15px;
  
  .toast__icon {
    padding: 0 5px;
    font-size: x-large;
  }
  
  .toast__text {
    padding: 0 5px;
  }
  
  padding: 0px;
  font-size: 16px;
  font-weight: 100;
  line-height: 50px
`
