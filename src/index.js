/* eslint react/jsx-filename-extension: 0 */
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { setGlobal } from 'reactn'
import App from './App'
import * as serviceWorker from './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.min.css'

// Reactn global state set up
setGlobal({
  alert: null,
  highlight: [],
})

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.register()
