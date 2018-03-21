import React, { Component } from 'react';
import styled from 'styled-components'

import DirectoryNode from './components/directoryNode'
import { textColor } from '../../theme/theme'

class Directory extends Component {
  constructor() {
    super();
    this.state = {
      directory:
        [
          {
            name: 'Variables',
            isQuestion: false,
            id: '1',
            children: [
              {
                name: 'Question A',
                isQuestion: true,
                completed: false,
                id: '2'
              }, {
                name: 'Control Structures',
                isQuestion: false,
                completed: false,
                id: '3',
                children: [{
                  name: 'for loop',
                  isQuestion: true,
                  completed: false,
                  id: 'a'
                }, {
                  name: 'for each loop',
                  isQuestion: true,
                  completed: false,
                  id: 'b'
                }, {
                  name: 'while loop',
                  isQuestion: true,
                  completed: true,
                  id: 'c'
                }
              ]
          }, {
            name: 'Question 5',
            isQuestion: true,
            completed: false,
            id: '5'
          }]
          }, {
            name: 'Question 5',
            isQuestion: true,
            completed: true,
            id: '5'
          }
        ]
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <h1>PraticeLit 🔥</h1>
        <div style={{
          padding: '0 7%'
        }}>
          <DirectoryNode node={this.state.directory}/>
        </div>
      </div>
    );
  }
}

export default styled(Directory)`
  color: ${textColor};
  font-size: 22px;
  font-weight: 100;
  
  h1 {
    margin-left: 15px;
  }
`
