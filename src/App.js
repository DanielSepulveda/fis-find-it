import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"

import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'

/*
    Route Components
*/

import Home from './views/Home'

import AnunciosPorCategoria from './views/anuncios/AnunciosPorCategoria'
import CrearAnuncio from './views/anuncios/CrearAnuncio'
import DetalleAnuncio from './views/anuncios/DetalleAnuncio'

import MisAnuncios from './views/perfil/MisAnuncios'
import Favoritos from './views/perfil/Favoritos'
import Chats from './views/perfil/Chats'
import Chat from './views/perfil/Chat'

import Signup from './views/auth/Signup'
import Login from './views/auth/Login'

/*
    - Route Components
*/

class App extends Component {
    render () {
        return (
            <Router>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/"
                        component={ Home }
                    />
                    <PrivateRoute
                        path="/anuncios"
                        component={ AnunciosPorCategoria }
                    />
                    <PrivateRoute
                        path="/crearAnuncio"
                        component={ CrearAnuncio }
                    />
                    <PrivateRoute
                        path="/anuncio/:id"
                        component={ DetalleAnuncio }
                    />
                    <PrivateRoute
                        path="/misAnuncios"
                        component={ MisAnuncios }
                    />
                    <PrivateRoute
                        path="/misFavoritos"
                        component={ Favoritos }
                    />
                    <PrivateRoute
                        path="/misChats"
                        component={ Chats }
                    />
                    <PrivateRoute
                        path="/chat/:id"
                        component={ Chat }
                    />
                    <PublicRoute
                        path="/login"
                        component={ Login }
                    />
                    <PublicRoute
                        path="/signup"
                        component={ Signup }
                    />
                </Switch>
            </Router>
        )
    }
}

export default App;
