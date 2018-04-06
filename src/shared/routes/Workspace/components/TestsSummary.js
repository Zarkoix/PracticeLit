import React from 'react'
import styled from 'styled-components'
import { textColor } from '../../../theme/theme'
import TestError from './TestError'

const TestsSummary = ({testErrorInfo, testsPassed, testsFailed, className}) =>
  (<div className={className}>
    {testErrorInfo && testErrorInfo.map((e, i) =>
      <TestError key={i} reason={e.reason} />
    )}
    {(testsPassed > 0 || testsFailed > 0) &&
      <div>
        {testsPassed}/{testsFailed + testsPassed} Test Cases Passed
      </div>
    }
  </div>)

export default styled(TestsSummary)`
  color: ${textColor};
`