import Loadable from 'react-loadable';
import React from 'react';

const LoadableLanding = Loadable({
  loader: () => import('./Landing'),
  loading() {
    return <div />
  }
});

export default LoadableLanding