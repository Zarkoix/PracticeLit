import React from 'react'
import { backgroundColor, secondaryColor } from '../../theme/theme'
import styled from 'styled-components'

const TitleBar = ({ textColor=backgroundColor, color=secondaryColor, className, title, elementLeft=null }) =>
  <div className={className}>
    {elementLeft &&
      <span style={{
        float: 'left'
      }}>
      {elementLeft}
      </span>
    }
    {title}
  </div>

export default styled(TitleBar)`
  padding: 10px;
  background-color: ${props => props.color};
  color: ${props => props.textColor};
  font-size: 24px;
  text-align: center;
  font-weight: 100;
`
