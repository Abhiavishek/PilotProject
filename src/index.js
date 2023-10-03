// src/index.js (or your entry point)

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Import the Provider component
import store from './store'; // Import your Redux store
import App from './App';

ReactDOM.render(
  // Wrap your App component with Provider and pass the store as a prop
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
