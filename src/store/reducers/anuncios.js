import {
    CREAR_ANUNCIO,
    FAVORITE_SUCCESS,
    UNFAVORITE_SUCCESS
} from '../actionTypes'

const initState = {
    anuncios: []
}

const anuncios = (state = initState, action) => {
    switch (action.type) {
        case CREAR_ANUNCIO:
            // console.log('crear anuncio', action.payload)
            return state
        case FAVORITE_SUCCESS:
            return state
        case UNFAVORITE_SUCCESS:
            return state
        default:
            return state
    }
}

export default anuncios
