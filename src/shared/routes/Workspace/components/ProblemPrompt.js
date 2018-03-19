import React from 'react'
import { textColor } from '../../../theme/theme'
import styled from 'styled-components'

const ProblemPrompt = ({ className, promptText }) => (<div className={className}>{promptText}</div>)

export default styled(ProblemPrompt)`
  color: ${textColor};
  font-size: 18px;
  text-align: left;
`
