import React, { Suspense } from 'react';
import { FirebaseAppProvider } from 'reactfire';
import reportWebVitals from './reportWebVitals';
import firebaseConfig from './firebase-config';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render((
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Suspense fallback={'Conectando la app...'}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Suspense>
  </FirebaseAppProvider>
), document.getElementById('root'));

reportWebVitals();