import PropTypes from 'prop-types'
import React from 'react'
import { errorColor } from '../../../theme/theme'

import styled from 'styled-components'

const TextField = ({onChange, type, placeholder, color, errorText}) =>
  (<div className="TextField">
    {errorText !== '' && (
      <div
        className="errorText"
        style={{ color: errorColor }}
      >{errorText}</div>
    )}
    <input
      style={{
        borderColor: color ? color : 'white'
      }}
      type={type}
      placeholder={placeholder}
      onChange={(e) => {
        onChange(e.target.value)
      }}
    />
  </div>)

export default styled(TextField)`
  padding: 5px;

  input {
    background-color: transparent;
    border: none;
    color: white;
    width: 100%;
    font-size: 16px;
    border-bottom: 1px solid; }

  input[type="text"]::placeholder, input[type="password"]::placeholder {
      color: #6272a4;
      opacity: 0.2;
  }
`

TextField.propTypes = {
  onChange: PropTypes.func,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  color: PropTypes.string,
  errorText: PropTypes.string
}