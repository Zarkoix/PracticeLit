import React from 'react'
import { backgroundColor, secondaryColor } from '../../../theme/theme'
import styled from 'styled-components'

const TitleBar = ({ className, title }) => (<div className={className}>{title}</div>)

export default styled(TitleBar)`
  padding: 10px;
  background-color: ${secondaryColor};
  color: ${backgroundColor};
  font-size: 24px;
  text-align: center;
`
