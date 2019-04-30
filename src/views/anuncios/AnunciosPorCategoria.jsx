import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

import Main from '../layouts/Main'
import CardAnuncio from '../../components/CardAnuncio'
import categorias from '../../data/categorias'

class MisAnuncios extends Component {
    static propTypes = {
        anuncios: PropTypes.array
    }

    static defaultProps = {
        anuncios: []
    }

    render () {
        const {
            anuncios,
            location
        } = this.props

        const params = new URLSearchParams(location.search)

        let categoria = ''
        categorias.forEach(c => {
            if (c.link === params.get('c')) {
                categoria = c.name
            }
        })

        return (
            <Main>
                <div className="py-3">
                    <h1 className="display-3 text-center mb-5"> { categoria } </h1>
                    <Container>
                        <Row>
                            { anuncios.map(anuncio => (
                                <Col
                                    key={ anuncio.id }
                                    sm="12"
                                    md="6"
                                    lg="4"
                                >
                                    <CardAnuncio
                                        anuncio={ anuncio }
                                    />
                                </Col>
                            )) }
                        </Row>
                    </Container>
                </div>
            </Main>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const params = new URLSearchParams(ownProps.location.search)
    const category = params.get('c')
    const anuncios = state.firestore.ordered.anuncios
    const anunciosPorCategoria = anuncios.filter(a => a.category === category)

    return {
        anuncios: anunciosPorCategoria || []
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'anuncios' }
    ])
)(MisAnuncios)
