import React, { Component } from 'react';
import Header from '../../components/Header.js'
import Footer from '../../components/Footer.js'
import TitleBar from './components/titlebar'

import styled from 'styled-components'
import { backgroundColor } from '../../theme/theme'

/**
 * The `App` component is the entry point for the react app.
 * It is rendered on the client as well as on the server.
 *
 * You can start developing your react app here.
 */
class Workspace extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <Header/>
        <TitleBar title={"Rigged Dice"} />
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
