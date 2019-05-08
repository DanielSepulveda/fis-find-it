import {
    CREAR_ANUNCIO,
    FAVORITE_SUCCESS,
    UNFAVORITE_SUCCESS
} from '../actionTypes'

import { storage } from '../../config/firebase'

export const crearAnuncio = ({ image, ...restPayload }, callback) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        const state = getState()

        const uid = state.firebase.auth.uid
        const imageRef = storage.ref().child(`images/${Date.now()}_${image.name}`)
        let anuncioId = ''

        imageRef.put(image).then(snapshot => {
            return imageRef.getDownloadURL()
        }).then(url => {
            return firestore.collection('anuncios').add({
                ...restPayload,
                image           : url,
                createdByName   : state.firebase.profile.name,
                createdById     : uid,
                createdAt       : new Date()
            })
        }).then(doc => {
            anuncioId = doc.id
            return firestore.collection('anuncios').doc(doc.id).get()
        }).then(doc => {
            return firestore.collection('users').doc(uid).update({
                anuncios: firestore.FieldValue.arrayUnion({
                    ...doc.data(),
                    id: anuncioId
                })
            })
        }).then(() => {
            callback()
            dispatch({
                type: CREAR_ANUNCIO
            })
        }).catch(err => {
            console.log(err)
        })
    }
}

export const favoriteAnuncio = ({ id }) => {
    console.log(id)
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const state = getState()
        const firestore = getFirestore()

        const uid = state.firebase.auth.uid
        const anuncio = state.firestore.data.anuncios[id]

        const favoritesUpdate = {}
        favoritesUpdate[`favorites.${id}`] = {
            id,
            ...anuncio
        }

        firestore.collection('users').doc(uid).update(favoritesUpdate).then(() => {
            return dispatch({
                type: FAVORITE_SUCCESS
            })
        }).catch(err => {
            console.log(err)
        })

    }
}

export const unfavoriteAnuncio = ({ id }) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const state = getState()
        const firestore = getFirestore()

        const uid = state.firebase.auth.uid

        firestore.collection('users').doc(uid).update({
            [`favorites.${id}`]: firestore.FieldValue.delete()
        }).then(() => {
            return dispatch({
                type: UNFAVORITE_SUCCESS
            })
        }).catch(err => {
            console.log(err)
        })

    }
}
