import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'

import reducers from './reducers'
import firebase from '../config/firebase'

const store = createStore(reducers, compose(
    applyMiddleware(
        thunk.withExtraArgument({
            getFirestore,
            getFirebase
        })
    ),
    reduxFirestore(firebase),
    reactReduxFirebase(firebase, {
        attachAuthIsReady       : true,
        useFirestoreForProfile  : true,
        userProfile             : 'users'
    })
))

export default store
