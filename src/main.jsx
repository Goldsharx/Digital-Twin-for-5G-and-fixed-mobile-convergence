import React from 'react';
import ReactDOM from 'react-dom/client';
import { Ion } from 'cesium';
import App from './App.jsx';
import './styles/globals.css';

const token = import.meta.env.VITE_CESIUM_ION_TOKEN;
if (token && token !== 'your_cesium_ion_token_here') {
  Ion.defaultAccessToken = token;
} else {
  // eslint-disable-next-line no-console
  console.warn(
    '[AXON Reality Canvas] No VITE_CESIUM_ION_TOKEN set. The globe will render but terrain/imagery may degrade. ' +
      'Create a token at https://ion.cesium.com/signin and add it to .env.'
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
