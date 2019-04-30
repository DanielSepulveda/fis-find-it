import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

/* 
    REDUX
*/

import { Provider } from 'react-redux'
import store from './store'

/*
    - REDUX
*/

store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(
        <Provider store={ store }>
            <App />
        </Provider>
    , document.getElementById('root'));

    serviceWorker.unregister();
})
