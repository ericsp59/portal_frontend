import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';


const REACT_VERSION = React.version;

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log(`React version: ${REACT_VERSION}`)
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
