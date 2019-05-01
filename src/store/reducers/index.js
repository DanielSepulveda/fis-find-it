import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

import authReducer from './auth'
import anunciosReducer from './anuncios'
import mensajesReducer from './mensajes'

const reducers = combineReducers({
    auth        : authReducer,
    anuncios    : anunciosReducer,
    firestore   : firestoreReducer,
    firebase    : firebaseReducer,
    mensajes    : mensajesReducer
})

export default reducers
