import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

import Main from './layouts/Main'
import CardAnuncio from '../components/CardAnuncio'

class Home extends Component {
    static propTypes = {
        anuncios: PropTypes.array
    }

    static defaultProps = {
        anuncios: []
    }

    render () {
        const {
            anuncios
        } = this.props

        return (
            <Main>
                <div className="py-3">
                    <h1 className="display-3 text-center mb-5"> Find It </h1>
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

const mapStateToProps = (state) => {
    return {
        anuncios: state.firestore.ordered.anuncios
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'anuncios' }
    ])
)(Home)
