// This is the front-end entrypoint.
// It is packaged, along with any referenced components into public/index.min.js
// This allows using ES6 import for including front-end libraries.

import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'

if (typeof window !== 'undefined') {
  window.$ = $;
  window.React = React;
  window.ReactDOM = ReactDOM;
  window.isMobile = function () {
    if ($(window).width() > 1025) return false
    else return true
  }
  window.clone = (obj) => JSON.parse(JSON.stringify(obj))
  window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
    if (typeof errorMsg === 'string') console.log("Error occured: " + errorMsg);
    return false;
  }
}

import App from './components/App.jsx'

ReactDOM.render(<App route={$('body').data('route')}/>, document.getElementById('app'))
