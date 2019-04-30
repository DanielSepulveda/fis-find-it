import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BackIcon from '@material-ui/icons/ArrowBack'
import styled from '@emotion/styled'
import MUIButton from '@material-ui/core/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import numeral from 'numeral'
import { Formik } from "formik"
import { object, string } from "yup"
import Form from 'react-bootstrap/Form'
import BButton from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

import Main from '../layouts/Main'

const Layout = styled.div`
    display: flex;
    flex-direction: column;
`

const Breadcrumb = styled.div`
    display: flex;
`

const Button = styled(MUIButton)`
    outline: none !important;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji" !important;
`

const schema = object({
    message: string()
        .required("Favor de ingresar un mensaje")
        .trim()
        .default('')
})

class DetalleAnuncio extends Component {
    static propTypes = {
        history     : PropTypes.object.isRequired,
        match       : PropTypes.object.isRequired
    }

    _handleSubmit = values => {
        console.log(values)
    }

    _handleGoBack = () => {
        const {
            history
        } = this.props

        history.goBack()
    }

    render () {
        const {
            props: {
                anuncio
            },
            _handleGoBack,
            _handleSubmit
        } = this

        return (
            <Main>
                <Layout>
                    <Breadcrumb className="mt-3 ml-3">
                        <Button
                            onClick={ _handleGoBack }
                        >
                            <BackIcon className="mr-3"/>
                            Regresar
                        </Button>
                    </Breadcrumb>
                    { !anuncio ? (
                            <div className="mt-3 d-flex justify-content-center align-items-center">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h1 className="display-2 text-center mb-5"> { anuncio.title } </h1>
                                <Container>
                                    <Row>
                                        <Col
                                            md="6"
                                            className="d-flex justify-content-center align-items-start mb-3"
                                        >
                                            <img src={ anuncio.image } alt="ad" className="img-fluid"/>
                                        </Col>
                                        <Col
                                            md="6"
                                        >
                                            <h4 className="text-success mb-3"> { numeral(anuncio.price).format('$0,0') } </h4>
                                            <p>
                                                { anuncio.desc }
                                            </p>
                                            <h4 className="mb-3"> Enviar Mensaje </h4>
                                            <Formik
                                                validationSchema={ schema }
                                                // validateOnChange={ false }
                                                onSubmit={ _handleSubmit }
                                                validateOnChange={ false }
                                                initialValues={{
                                                    message: '',
                                                }}
                                            >
                                                { ({
                                                    handleSubmit,
                                                    handleChange,
                                                    values,
                                                    touched,
                                                    errors
                                                }) => (
                                                    <Form
                                                        noValidate
                                                        onSubmit={ handleSubmit }
                                                    >
                                                        <Form.Group
                                                            controlId="formMessage"
                                                        >
                                                            <Form.Control
                                                                as="textarea"
                                                                name="message"
                                                                value={ values.message }
                                                                onChange={ handleChange }
                                                                isValid={ touched.message && !errors.message }
                                                                isInvalid={ !!errors.message }
                                                                placeholder="Mensaje"
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                { errors.message }
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                        <Form.Group>
                                                            <BButton
                                                                variant="primary"
                                                                onClick={ handleSubmit }
                                                            >
                                                                Enviar
                                                            </BButton>
                                                        </Form.Group>
                                                    </Form>
                                                ) }
                                            </Formik>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        )
                    }
                </Layout>
            </Main>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id
    const anuncios = state.firestore.data.anuncios
    return {
        anuncio: anuncios ? anuncios[id] : null
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'anuncios' }
    ])
)(DetalleAnuncio)
