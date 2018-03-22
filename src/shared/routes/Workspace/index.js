import React from 'react';
import Loadable from 'react-loadable'

const LoadableWorkspace = Loadable({
  loader: () => import(/* webpackChunkName: "workspace" */ './WorkSpace'),
  loading() {
    return <div />
  }
});

export default LoadableWorkspace