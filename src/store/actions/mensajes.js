import {
    MESSAGE_SUCCESS,
    MESSAGE_ERROR
} from '../actionTypes'

// import { storage } from '../../config/firebase'

export const crearChatMensaje = ({
    anuncio,
    currentUser,
    content
}) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()

        let chatId = ''

        firestore.collection('chats').add({
            members: [
                { ...currentUser },
                {
                    id      : anuncio.createdById,
                    name    : anuncio.createdByName
                }
            ],
            anuncio,
            messages: [{
                content,
                sender: {
                    id      : currentUser.id,
                    name    : currentUser.name
                }
            }]
        }).then(doc => {
            chatId = doc.id
            firestore.collection('users').doc(currentUser.id).update({
                chats: firestore.FieldValue.arrayUnion({
                    chatId,
                    anuncio
                })
            })
        }).then(() => {
            firestore.collection('users').doc(anuncio.createdById).update({
                chats: firestore.FieldValue.arrayUnion({
                    chatId,
                    anuncio
                })
            })
        }).then(() => {
            dispatch({
                type: MESSAGE_SUCCESS
            })
        }).catch(err => {
            console.log(err)
            dispatch({
                type: MESSAGE_ERROR
            })
        })
    }
}

export const crearMensaje = ({ chatId, ...restPayload }) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()

        firestore.collection('chats').doc(chatId).update({
            messages: firestore.FieldValue.arrayUnion({
                ...restPayload
            })
        }).then(() => {
            dispatch({
                type: MESSAGE_SUCCESS
            })
        }).catch(() => {
            dispatch({
                type: MESSAGE_ERROR
            })
        })
    }
}
