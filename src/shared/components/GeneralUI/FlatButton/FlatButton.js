import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { backgroundColor } from '../../../theme/theme'

const defaultOnClick = (e) => e.preventDefault()

const FlatButton = ({className, text, type,
                      onClick=defaultOnClick,
                      color="white",
                      backgroundColor="transparent",
                      big=false,
                      disabled=false,
                      disabledColor='grey',
                      style={}}) =>
  (<button
    className={className}
    style={{ style }}
    onClick={() => {
      if (!disabled) onClick()
    }}
    type={type}
  > {text} </button>)


export default styled(FlatButton)`
  background-color: transparent;
  border: 1px solid ${props => !props.disabled ? props.color : props.disabledColor};
  border-radius: 5px;
  color: ${props => !props.disabled ? props.color : props.disabledColor};
  cursor: ${props => !props.disabled ? 'pointer' : 'not-allowed'};
  padding: 2px 15px;
  font-size: ${(props => props.big) ? '36px' : '16px' };
  transition: background-color, color 0.2s ease-in-out;

  &:hover {
      background-color: ${props => !props.disabled ? props.color : 'transparent'};
      color: ${props => !props.disabled ? props.backgroundColor : props.disabledColor};
  }
`

FlatButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  disabled: PropTypes.bool,
  disabledColor: PropTypes.string,
  style: PropTypes.object
}