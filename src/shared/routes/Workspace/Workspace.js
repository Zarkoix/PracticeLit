import React, { Component } from 'react';
import Header from '../../components/Header.js'
import TitleBar from './components/TitleBar.js'
import ProblemPrompt from './components/ProblemPrompt.js'
import LoadableEditor from './components/LoadableEditor.js'
import Footer from '../../components/Footer.js'



import styled from 'styled-components'
import { backgroundColor, primaryColor } from '../../theme/theme'
import FlatButton from '../../components/GeneralUI/FlatButton/FlatButton'

/**
 * The `App` component is the entry point for the react app.
 * It is rendered on the client as well as on the server.
 *
 * You can start developing your react app here.
 */

// let prompt = "Suppose the following variables are defined: Indicate on each line below the output produced by each statement shown. If the statement produces more than one line of output indicate the line breaks with slashes as in a/b/c to indicate three lines of output with a followed by b followed by c. If the statement causes an error, write the word error to indicate this. "

let prompt = `
Write a method countMultiples that could be added to the IntTree class from lecture and section. The method returns a count of the number of multiples of a particular value in the binary tree. Given a number n, a value m is considered a multiple of n if it can be expressed as (k * n) for some integer k. For example, suppose that an IntTree variable tree stores a reference to the following tree:

               +---+
               | 6 |
           ___ +---+ ___
         /               \\
     +---+               +---+
     | 2 |               | 9 |
     +---+               +---+
    /     \\                   \\
+---+     +---+               +---+
| 5 |     | 3 |               | 4 |
+---+     +---+               +---+
         /     \\             /     \\
     +---+     +---+     +---+     +---+
     | 8 |     | 6 |     | 7 |     | 0 |
     +---+     +---+     +---+     +---+

The table below shows various calls and the values they should return:
Call 	Value Returned 	Reason
tree.countMultiples(2); 	6 	six multiples of 2 : 6, 2, 8, 6, 4, 0
tree.countMultiples(4); 	3 	three multiples of 4 : 8, 4, 0
tree.countMultiples(3); 	5 	five multiples of 3 : 6, 3, 6, 9, 0
tree.countMultiples(1); 	10 	all ten values are multiples of 1

Your method should throw an IllegalArgumentException if passed the value 0.

You may define private helper methods to solve this problem, but otherwise you may not call any other methods of the class nor create any data structures such as arrays, lists, etc. Your method should not change the structure or contents of the tree.

Assume that you are adding this method to the IntTree class as defined below:

public class IntTree {
    private IntTreeNode overallRoot;
    ...
}
`

class Workspace extends Component {
  constructor () {
    super();
    this.state = {
      done: true,
      loaded: false,
      problemPrompt: prompt,
      solutionText: "",
      testCaseInfo: []
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
        <Header/>
        <TitleBar title={"Rigged Dice" + (this.state.done ? " ✅" : "")} />
        <div style={{
          padding: '5% 7%'
        }}>
          <ProblemPrompt promptText={this.state.problemPrompt} />
          { canUseDOM && <LoadableEditor /> }
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
            />
          </div>
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
`
