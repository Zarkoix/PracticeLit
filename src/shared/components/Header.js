import React from 'react'
import { primaryColor, backgroundColor } from '../theme/theme'
import styled from 'styled-components'

const Header = ({ className }) => (<div className={className}>PracticeLit🔥</div>)

export default styled(Header)`
  padding: 5px;
  background-color: ${primaryColor};
  color: ${backgroundColor};
  font-size: 24px;
`
