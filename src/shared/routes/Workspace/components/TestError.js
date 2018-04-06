import React from 'react'
import styled from 'styled-components'
import { errorColor } from '../../../theme/theme'

const TestError = ({reason, className}) =>
  (<div className={className}>
    <div className="errorIcon">⚠️</div>
    <div className="errorText">
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
  
  p {
    margin: 0
  }
`