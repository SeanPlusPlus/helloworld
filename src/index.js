import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { setGlobal } from 'reactn'
import 'bootstrap/dist/css/bootstrap.min.css'

// Reactn global state set up
setGlobal({
  answer: null,
})

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
