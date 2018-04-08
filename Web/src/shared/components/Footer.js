import React from 'react'
import { primaryColor, backgroundColor } from '../theme/theme'
import styled from 'styled-components'

const Footer = ({ className }) => (<div className={className}><h2>Adam Towers</h2></div>)

export default styled(Footer)`
  background-color: ${primaryColor};
  color: ${backgroundColor};
  font-size: 12px;
  width: 100%;
  
   h2 {
    font-weight: 100;
    padding: 5px 10px;
    margin: 0;
  }
`
