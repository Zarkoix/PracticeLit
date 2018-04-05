import React from 'react'
import styled from 'styled-components'
import { errorColor } from '../../../theme/theme'

const TestError = ({name, reason, className}) =>
  (<div className={className}>
    <div className="errorIcon">⚠️</div>
    <div className="errorText">
      <h4>{name}</h4>
      <p>{reason}</p>
    </div>

  </div>)

export default styled(TestError)`
  color: ${errorColor};
  border: 1px solid ${errorColor};
  padding: 10px;
  border-radius: 15px;
  display: flex;
  
  .errorIcon {
    font-size: x-large;
    padding-right: 15px;
  }
  
  .errorText {
  }
  
  h4, p {
    margin: 0
  }
`