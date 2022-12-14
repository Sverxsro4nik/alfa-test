import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './store/store';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.querySelector('.root') as HTMLDivElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
