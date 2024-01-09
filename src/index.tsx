import './style/styles.scss'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

declare global {
  interface Window {
    __env__: {
      [index: string]: string
    }
  }
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // Google Maps MarkerClusterer component not working correctly under StrictMode
  // StrictMode runs useEffect methods additional time so there is 2 logs in console
  //<React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  //</React.StrictMode>
)
