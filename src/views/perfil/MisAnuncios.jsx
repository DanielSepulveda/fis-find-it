import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import MUIFab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

import Main from '../layouts/Main'
import CardAnuncio from '../../components/CardAnuncio'

const Fab = styled(MUIFab)`
    position: absolute !important;
    right: 40px !important;
    bottom: 48px !important;
    color: #fff !important;
    background-color: #007bff !important;
    :hover {
        background-color: #0056b3 !important;
    }
`

class MisAnuncios extends Component {
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
                    <h1 className="display-3 text-center mb-5"> Mis Anuncios </h1>
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
                    <Link
                        to="/crearAnuncio"
                    >
                        <Fab
                            size="large"
                        >
                            <AddIcon />
                        </Fab>
                    </Link>
                </div>
            </Main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        anuncios: state.firebase.profile.anuncios || []
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'anuncios' }
    ])
)(MisAnuncios)
