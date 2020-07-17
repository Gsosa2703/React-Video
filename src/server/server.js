import express from 'express';
import dotenv from 'dotenv'
import webpack from 'webpack'
import React from 'react';
import {renderToString}  from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from '../frontend/reducers'
import initialSate from '../frontend/initialState'
import { renderRoutes} from 'react-router-config'
//render Routes recibe un array de rutas
import serverRoutes from '../frontend/routes/serverRoutes'
dotenv.config()

const {
    ENV,
    PORT
} = process.env;

const app = express();

if (ENV === 'development') {
    console.log('deveploment cong')
    const webpackConfig = require('../../webpack.config')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const compiler = webpack(webpackConfig)
    const serverConfig = {
        port: PORT,
        hot: true
    }

    app.use(webpackDevMiddleware(compiler, serverConfig))
    app.use(webpackHotMiddleware(compiler))

}
//req es donde vamos a obtener toda la informacion del request que hace el usuario
//res se usa para dar una respuesta al usuario

const setResponse= (html, preloadedState)=>{
    return (
        `
        <!DOCTYPE html>
        <html>
        <head>
        <link rel="stylesheet" href="assets/app.css" type="text/css">
            <title>Platzi Video</title>
        </head>
        <body>
            <div id="app">${html}</div>
            <script>
            window.__PRELOADED_STATE__ = 
            ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
            </script>
            <script src="assets/app.js" type="text/javascript"> </script>
        </body>
        </html>
        `
    )
}

const renderApp = (req, res) => {
    const store = createStore(reducer, initialSate)
    const preloadedState = store.getState()
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={{}}>
            {renderRoutes(serverRoutes)}

            </StaticRouter>
        </Provider>,

    )
    res.send(setResponse(html, preloadedState))
}

app.get('*', renderApp)

app.listen(PORT, (err) => {
    if (err) console.log(err)
    else console.log('Server running on port 3000')

})