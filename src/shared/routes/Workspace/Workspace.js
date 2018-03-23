import React, { Component } from 'react';
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

// let prompt = "Suppose the following variables are defined: Indicate on each line below the output produced by each statement shown. If the statement produces more than one line of output indicate the line breaks with slashes as in a/b/c to indicate three lines of output with a followed by b followed by c. If the statement causes an error, write the word error to indicate this. "

let prompt = `
<p>Write a method countMultiples that could be added to the IntTree class from lecture and section. The method returns a count of the number of multiples of a particular value in the binary tree. Given a number n, a value m is considered a multiple of n if it can be expressed as (k * n) for some integer k. For example, suppose that an IntTree variable tree stores a reference to the following tree:</p>

<p>The table below shows various calls and the values they should return:</p>
<table >
    <thead>
      <th>Call</th>
      <th>Value Returned</th>
      <th>Reason</th>
    </thead>
	<tbody>
		<tr>
			<td>tree.countMultiples(2);</td>
			<td>6</td>
			<td>six multiples of 2 : 6, 2, 8, 6, 4, 0</td>
		</tr>
		<tr>
			<td>tree.countMultiples(4);</td>
			<td>3</td>
			<td>three multiples of 4 : 8, 4, 0</td>
		</tr>
		<tr>
			<td>tree.countMultiples(3);</td>
			<td>5</td>
			<td>five multiples of 3 : 6, 3, 6, 9, 0</td>
		</tr>
		<tr>
			<td>tree.countMultiples(1);</td>
			<td>10</td>
			<td>all ten values are multiples of 1</td>
		</tr>
	</tbody>
</table>
<p>Your method should throw an <code>IllegalArgumentException</code> if passed the value 0.</p>
<p>You may define private helper methods to solve this problem, but otherwise you may not call any other methods of the class nor create any data structures such as arrays, lists, etc. Your method should not change the structure or contents of the tree.</p>
<p>Assume that you are adding this method to the IntTree class as defined below:</p>
<!-- HTML generated using hilite.me --><div style="background: #272822; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #66d9ef">public</span> <span style="color: #66d9ef">class</span> <span style="color: #a6e22e">IntTree</span> <span style="color: #f92672">{</span>
    <span style="color: #66d9ef">private</span> <span style="color: #f8f8f2">IntTreeNode</span> <span style="color: #f8f8f2">overallRoot</span><span style="color: #f92672">;</span>
    <span style="color: #f92672">...</span>
<span style="color: #f92672">}</span>
</pre></div>

`

class Workspace extends Component {
  constructor () {
    super();
    this.state = {
      done: true,
      loaded: false,
      problemPrompt: prompt,
      solutionText: "",
      testCasesPassed: 1,
      testCasesFailed: 1,
      testCaseInfo: [{
        name: "Test Case 1",
        isPassed: true,
        givenInput: "1-5",
        expectedOutput: "12345",
        givenOutput: "12345"
      }, {
        name: "Test Case 2",
        isPassed: false,
        givenInput: "5-1",
        expectedOutput: "54321",
        givenOutput: "abcde"
      }]
    }
  }

  /*
  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        loaded: true,
        problemPrompt: ""
      })
    }, 2000)
  }
  */

  render() {
    const canUseDOM = typeof window !== 'undefined'
    console.log("cud: " + canUseDOM);
    return (
      <div className={this.props.className}>
        <TitleBar
          color={backgroundColor}
          textColor={textColor}
          title={"Rigged Dice" + (this.state.done ? " ✅" : "")}
          elementLeft={<Link to="/q">🔥</Link>}
        />
        <div style={{
          padding: '1% 7%'
        }}>
          <ProblemPrompt promptText={this.state.problemPrompt} />
          <div>
            { canUseDOM && <LoadableEditor /> }
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
              onClick={() => console.log("ohmy")}
              big
            />
          </div>
          <TestsSummary testsPassed={this.state.testCasesPassed} testsFailed={this.state.testCasesFailed} />
          {this.state.testCaseInfo.map((c) =>
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
        <Footer />
      </div>
    );
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
