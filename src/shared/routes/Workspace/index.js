import React from 'react';
import Loadable from 'react-loadable'

const LoadableWorkspace = Loadable({
  loader: () => import('./WorkSpace'),
  loading() {
    return <div />
  }
});

export default LoadableWorkspace