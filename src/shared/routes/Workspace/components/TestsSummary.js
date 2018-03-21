import React from 'react'
import styled from 'styled-components'
import { textColor } from '../../../theme/theme'

const TestsSummary = ({testsPassed, testsFailed, className}) =>
  (<div className={className}>
    {(testsPassed > 0 || testsFailed > 0) &&
    <div>
      {testsPassed}/{testsFailed + testsPassed} Test Cases Passed
    </div>}
  </div>)

export default styled(TestsSummary)`
  color: ${textColor};
  border-bottom: 1px solid ${textColor};
`