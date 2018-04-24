import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import SocketProvider from './components/SocketProvider'
import universal from 'react-universal-component';

const UniversalComponent = universal(props => import(`./${props.page}`))

/**
 * The `App` component is the entry point for the react app.
 * It is rendered on the client as well as on the server.
 *
 * You can start developing your react app here.
 */
class App extends Component {
  render = () =>
    <SocketProvider>
      <Switch>
        <Route exact path='/' component={() => <UniversalComponent page="routes/Landing/Landing.js" />}/>
        <Route path='/q' component={() => <UniversalComponent page="routes/Directory/Directory.js" />}/>
        <Route path='/a/:id' component={() => <UniversalComponent page="routes/Workspace/Workspace.js" />}/>
        <Route otherwise component={() => <UniversalComponent page="routes/Unknown/Unknown.js" />}/>
      </Switch>
    </SocketProvider>
}

export default App
