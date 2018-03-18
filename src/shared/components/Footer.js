import React from 'react'
import { primaryColor, backgroundColor } from '../theme/theme'
import styled from 'styled-components'

const Footer = ({ className }) => (<div className={className}>Adam Towers</div>)

export default styled(Footer)`
  position: fixed;
  bottom: 0;
  
  padding: 5px;
  padding-right: 10px;
  background-color: ${primaryColor};
  color: ${backgroundColor};
  font-size: 12px;
  width: 100%;
`
