import React from 'react';
import Loadable from 'react-loadable';

const LoadableEditor = Loadable({
  loader: () => import('./Editor'),
  loading() {
    return <div>Loading...</div>
  }
});

export default LoadableEditor