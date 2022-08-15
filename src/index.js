import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {BrowserRouter as Router, Route} from 'react-router-dom' 
import App from './components/app/app';
import state from './red/state';
import Login from './components/login/login';

import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './red/auth-context'


const REACT_VERSION = React.version;

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log(`React version: ${REACT_VERSION}`)


root.render(
  // <React.StrictMode>
  <>
    <Router>

      <AuthProvider>
        <PrivateRoute exact path=''>
          <App state = {state}/>
        </PrivateRoute>

        <Route exact path='/login'>
          <Login/>
        </Route>
      </AuthProvider>

    </Router>

  </> 
  //</React.StrictMode>
);

