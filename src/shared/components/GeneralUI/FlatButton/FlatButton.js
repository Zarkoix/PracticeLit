import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { backgroundColor } from '../../../theme/theme'

const defaultOnClick = (e) => e.preventDefault()

const FlatButton = ({className, onClick=defaultOnClick, text, type, color="white", backgroundColor="transparent", big, style={}}) =>
  (<button
    className={className}
    style={{ style }}
    onClick={onClick}
    type={type}
  > {text} </button>)


export default styled(FlatButton)`
  background-color: transparent;
  border: 1px solid ${props => props.color};
  border-radius: 5px;
  color: ${props => props.color};
  cursor: pointer;
  padding: 2px 15px;
  font-size: ${(props => props.big) ? '36px' : '16px' };
  transition: background-color, color 0.2s ease-in-out;

  &:hover {
    background-color: ${props => props.color};
    color: ${props => props.backgroundColor};
  }
`

FlatButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  style: PropTypes.object
}