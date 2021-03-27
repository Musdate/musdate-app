import React, { Suspense } from 'react';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render((
    <Suspense fallback={'Conectando la app...'}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Suspense>
), document.getElementById('root'));

reportWebVitals();