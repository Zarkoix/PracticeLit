import React from 'react';
import Loadable from 'react-loadable';

const LoadableEditor = Loadable({
  loader: () => import(/* webpackChunkName: "editor" */ './Editor'),
  loading() {
    return <div>Loading...</div>
  }
});

export default LoadableEditor