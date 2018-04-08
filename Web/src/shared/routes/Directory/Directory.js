import React, { Component } from 'react';
import styled from 'styled-components'

import DirectoryNode from './components/directoryNode'
import { textColor } from '../../theme/theme'

class Directory extends Component {
  constructor() {
    super();
    this.state = {
      directory: []
    }
  }

  componentDidMount() {
    fetch('/api/r/').then(res => res.json()).then(res => {
      this.setState({
        directory: res.directory
      })
    })
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
