import React from 'react'
import { textColor, errorColor, successColor } from '../../../theme/theme'
import styled from 'styled-components'

const TestCase = ({ className, testCaseName, isPassed, givenInput, expectedOutput, givenOutput}) =>
  (<div className={className} >
    <div style={{
      display: "inline-block"
    }}>
      <div>
        <h2>
          {isPassed ? "Passed" : "Failed"}
        </h2>
      </div>
      <div>
        <h3>
        {testCaseName}
        </h3>
      </div>
    </div>
    <div style={{
      display: "inline-block",
      marginLeft: "20px"
    }}>
      <p>Input: {givenInput}</p>
    </div>
    <div style={{
      display: "inline-block",
      marginLeft: "20px"
    }}>
      =>
    </div>
    <div style={{
      display: "inline-block",
      marginLeft: "20px"
    }}>
      <p>Expected Output: {expectedOutput}</p>
      <p>Your Output: {givenOutput}</p>
    </div>

  </div>)

export default styled(TestCase)`
  margin: 5% 0;
  padding: 10px 5%;
  color: ${ props => props.isPassed ? successColor : errorColor };
  font-size: 18px;
  text-align: left;
  border: 1px solid ${ props => props.isPassed ? successColor : errorColor };
  border-radius: 5px;
  
  h2 {
    margin-bottom: 0;
    margin-top: 10px;
  }
  
  h3 {
    font-weight: 100;
    margin-top: 0;
    margin-bottom: 10px;
  }
  
  p {
    margin: 5px 0 0 10px;
  }
`
