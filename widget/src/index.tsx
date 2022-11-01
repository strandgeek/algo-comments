import './polyfill'
import './index.css'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloClient, InMemoryCache } from '@apollo/client'



function documentReady(fn: () => void) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 1);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
}    


documentReady(() => {
  const rootEl = document.querySelector('#algo-comments-widget')
  const client = new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? 'http://localhost:4000/graphql': 'https://algo-comments.strandgeek.com/graphql',
    cache: new InMemoryCache(),
  });
  ReactDOM.render(<App client={client} config={window.AlgoComments} />, rootEl);
})





