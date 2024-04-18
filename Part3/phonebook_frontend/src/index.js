import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
const basicInfo = {info: 0};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App basicInfo={basicInfo} />
  </React.StrictMode>
);



