import {
    LOG_IN_ERROR,
    LOG_IN_SUCCESS,
    LOG_OUT_SUCCESS,
    SIGN_UP_SUCCESS,
    SIGN_UP_ERROR
} from '../actionTypes'

const initState = {
    authError: null
}

const auth = (state = initState, action) => {
    switch (action.type) {
        case LOG_IN_ERROR:
            // console.log('login error')
            return {
                ...state,
                authError: 'Error al iniciar sesion'
            }
        case LOG_IN_SUCCESS:
            // console.log('login ok')
            return {
                ...state,
                authError: null
            }
        case LOG_OUT_SUCCESS:
            console.log('logout')
            return state
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                authError: null
            }
        case SIGN_UP_ERROR:
            return {
                ...state,
                authError: action.error.message
            }
        default:
            return state
    }
}

export default auth
