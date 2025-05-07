// src/index.jsx (or src/main.jsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './route';
import reportWebVitals from './reportWebVitals';

const urlParams = new URLSearchParams(window.location.search);
const redirectedPath = urlParams.get("redirect");
if (redirectedPath) {
  window.history.replaceState({}, "", redirectedPath);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);

reportWebVitals();


