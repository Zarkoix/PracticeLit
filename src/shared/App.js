import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from './routes/Landing'
import Directory from './routes/Directory'
import Workspace from './routes/Workspace'
import Unknown from './routes/Unknown'

import './App.styl'

/**
 * The `App` component is the entry point for the react app.
 * It is rendered on the client as well as on the server.
 *
 * You can start developing your react app here.
 */
class App extends Component {
    render() {
        return (
            <Switch>
              <Route exact path='/' component={Landing}/>
              <Route path='/q' component={Directory}/>
              <Route path='/a/:id' component={Workspace}/>
              <Route otherwise component={Unknown}/>
            </Switch>
        );
    }
}

export default App
