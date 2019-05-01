import {
    MESSAGE_SUCCESS,
    MESSAGE_ERROR
} from '../actionTypes'

const initState = {
    mensajes: []
}

const mensajes = (state = initState, action) => {
    switch (action.type) {
        case MESSAGE_SUCCESS:
            return state
        case MESSAGE_ERROR:
            return state
        default:
            return state
    }
}

export default mensajes
