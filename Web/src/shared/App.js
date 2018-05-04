import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import SocketProvider from './components/SocketProvider'
import universal from 'react-universal-component';

const UniversalComponent = universal(props => import(`./routes/async/${props.page}`))

class App extends Component {
  render = () =>
    <SocketProvider>
      <Switch>
        <Route render={props =>
          <UniversalComponent page={router(props.location.pathname)} />
        }></Route>
      </Switch>
    </SocketProvider>
}

function router (route) {
  switch(route) {
    case '/': {
      return 'Landing'
    }
    case '/q': {
      return 'Directory'
    }
  }

  if (/\/a\/[a-zA-Z0-9]+/.test(route)) {
    return 'Workspace'
  }

  return 'Unknown'
}

export default App
