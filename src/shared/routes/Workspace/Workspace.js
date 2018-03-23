import React, { Component } from 'react'
import TitleBar from '../../components/GeneralUI/TitleBar.js'
import ProblemPrompt from './components/ProblemPrompt.js'
import LoadableEditor from './components/LoadableEditor.js'
import Footer from '../../components/Footer.js'
import TestCase from './components/TestCase'
import TestsSummary from './components/TestsSummary'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { textColor, backgroundColor, primaryColor } from '../../theme/theme'
import FlatButton from '../../components/GeneralUI/FlatButton/FlatButton'

class Workspace extends Component {
  constructor (props) {
    super(props)
    this.state = {
      qId: props.match.params.id,
      done: true,
      loaded: false,
      problemPrompt: '',
      solutionText: '',
      tests: null
    }
  }


  componentDidMount() {
    fetch('/api/r/' + this.state.qId).then(r => r.text()).then(r => this.setState({
      problemPrompt: r
    }))
  }

  submit () {
    fetch('/api/submit').then(r => r.json()).then(r => this.setState({
      tests: r
    }))
  }

  render () {
    const canUseDOM = typeof window !== 'undefined'
    return (
      <div className={this.props.className}>
        <TitleBar
          color={backgroundColor}
          textColor={textColor}
          title={'Rigged Dice' + (this.state.done ? ' ✅' : '')}
          elementLeft={<Link to="/q">🔥</Link>}
        />
        <div style={{
          padding: '1% 7%'
        }}>
          <ProblemPrompt promptText={this.state.problemPrompt}/>
          <div>
            {canUseDOM && <LoadableEditor/>}
          </div>
          <div style={{
            margin: '5% 0',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <FlatButton
              text="Submit Code"
              color={primaryColor}
              backgroundColor={backgroundColor}
              onClick={this.submit}
              big
            />
          </div>
          {this.state.tests ? [
            <TestsSummary testsPassed={this.state.tests.testCasesPassed}
                          testsFailed={this.state.tests.testCasesFailed}/>,
            <div>
              {this.state.tests.testCaseInfo.map((c) =>
                <TestCase
                  key={c.name}
                  testCaseName={c.name}
                  isPassed={c.isPassed}
                  givenInput={c.givenInput}
                  expectedOutput={c.expectedOutput}
                  givenOutput={c.givenOutput}
                />
              )}
            </div>
          ] : null }
        </div>
        <Footer/>
      </div>
    )
  }
}

export default styled(Workspace)`
  background-color: ${backgroundColor};
  min-height: 100%;
  height: 100%;
  
  table {
    width: 100%;
    text-align: left;
    
    border: 1px solid white;
    border-radius: 5px;
    padding: 5px;
  }
  
  thead {
    color: ${primaryColor};
  }
  
  tbody {
    color: ${textColor};
  }
  
  code {
    background-color: grey;
    border-radius: 5px;
    padding: 3px;
  }
`
