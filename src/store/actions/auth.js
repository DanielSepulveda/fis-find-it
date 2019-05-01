import {
    LOG_IN_SUCCESS,
    LOG_IN_ERROR,
    LOG_OUT_SUCCESS,
    SIGN_UP_SUCCESS,
    SIGN_UP_ERROR
} from '../actionTypes'

export const logIn = (payload, callback) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()

        firebase.auth().signInWithEmailAndPassword(
            payload.email,
            payload.password
        ).then(() => {
            callback()
            dispatch({
                type: LOG_IN_SUCCESS
            })
        }).catch(err => {
            dispatch({
                type    : LOG_IN_ERROR,
                error   : err
            })
        })
    }
}

export const logOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()

        firebase.auth().signOut().then(() => {
            dispatch({
                type: LOG_OUT_SUCCESS
            })
        })
    }
}

export const signUp = (payload) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()
        const firestore = getFirestore()

        firebase.auth().createUserWithEmailAndPassword(
            payload.email,
            payload.password
        ).then(({ user }) => {
            return firestore.collection('users').doc(user.uid).set({
                name        : payload.name,
                anuncios    : [],
                favorites   : {},
                chats       : []
            })
        }).then(() => {
            dispatch({
                type: SIGN_UP_SUCCESS
            })
        }).catch(err => {
            dispatch({
                type    : SIGN_UP_ERROR,
                error   : err
            })
        })
    }
}
