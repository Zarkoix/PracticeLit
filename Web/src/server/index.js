import React from 'react';
import ReactDOM from 'react-dom/server';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import {StaticRouter} from 'react-router'
import { ServerStyleSheet } from 'styled-components'; // <-- importing ServerStyleSheet


import App from '../shared/App';

/**
 * Provides the server side rendered app. In development environment, this method is called by
 * `react-hot-server-middleware`.
 *
 * This method renders the ejs template `public/views/index.ejs`.
 *
 * @param clientStats Parameter passed by hot server middleware
 */
export default ({ clientStats }) => async (req, res) => {
    console.log('running render')
    const ClientApp = () =>
      <StaticRouter context={{}} location={req.url}>
        <App/>
      </StaticRouter>

    const sheet = new ServerStyleSheet(); // <-- creating out stylesheet

    const appString = ReactDOM.renderToString(sheet.collectStyles(<ClientApp />));
    const styledComponents = sheet.getStyleTags(); // <-- getting all the tags from the sheet
    const chunkNames = flushChunkNames();
    const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });

    res.render('index', {
        appString,
        js,
        styles,
        cssHash,
        styledComponents
    });
    console.log('finished render')
};
