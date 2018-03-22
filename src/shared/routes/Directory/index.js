import React from 'react';
import Loadable from 'react-loadable'

const LoadableDirectory = Loadable({
  loader: () => import('./Directory'),
  loading() {
    return <div />
  }
});

export default LoadableDirectory