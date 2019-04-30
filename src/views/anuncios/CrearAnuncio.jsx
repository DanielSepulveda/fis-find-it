import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Formik } from "formik"
import { object, string, mixed, number } from "yup"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { withRouter } from 'react-router'
import { connect } from "react-redux"
import { compose } from 'redux'

import { crearAnuncio } from '../../store/actions/anuncios'
import categorias from '../../data/categorias'

const schema = object({
    category: string()
        .trim()
        .required("Favor de ingresar una categoria")
        .default(''),
    image: mixed()
        .required("Favor de ingresar una imagen"),
    title: string()
        .required("Favor de ingresar un titulo")
        .trim()
        .default(''),
    desc: string()
        .required("Favor de ingresar una descripción")
        .trim()
        .default(''),
    price: number()
        .required("Favor de ingresar un precio")
        .positive("Favor de ingrsar un precio valido")
        .integer("Favor de ingresar un precio entero")
        .default(0)
})

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 40px 0px;
    height: 100vh;
`

const FormWrapper = styled.div`
    width: 100%;
    max-width: 500px;
    padding: 15px;
    margin: auto;
`

class CrearAnuncio extends Component {
    constructor (props) {
        super(props)
        this.formRef = React.createRef()
    }

    static propTypes = {
        history         : PropTypes.object.isRequired,
        crearAnuncio    : PropTypes.func.isRequired
    }

    _handleSubmit = values => {
        const {
            crearAnuncio,
            history
        } = this.props

        crearAnuncio(values, () => {
            history.goBack()
        })

    }

    _handleImage = e => {
        const {
            formRef: {
                current: currentForm
            }
        } = this

        currentForm.setFieldValue('image', e.target.files[0])
    }

    _handleGoBack = () => {
        const {
            history
        } = this.props

        history.goBack()
    }

    render () {
        const {
            _handleSubmit,
            _handleImage,
            _handleGoBack,
            formRef
        } = this

        // const categories = categorias.map(({ name }) => name)

        return (
            <Container
                className="bg-light"
            >
                <FormWrapper
                    className="text-center"
                >
                    <h1 className="mb-3"> Crear Anuncio </h1>
                    <Formik
                        ref={ formRef }
                        validationSchema={ schema }
                        // validateOnChange={ false }
                        onSubmit={ _handleSubmit }
                        validateOnChange={ false }
                        initialValues={{
                            category    : '',
                            image       : {},
                            title       : '',
                            desc        : '',
                            price       : ''
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
                                    controlId="formTitle"
                                >
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        value={ values.title }
                                        onChange={ handleChange }
                                        isValid={ touched.title && !errors.title }
                                        isInvalid={ !!errors.title }
                                        placeholder="Titulo"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        { errors.title }
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group
                                    controlId="formCategory"
                                >
                                    <Form.Control
                                        as="select"
                                        name="category"
                                        value={ values.category }
                                        onChange={ handleChange }
                                        isValid={ touched.category && !errors.category }
                                        isInvalid={ !!errors.category }
                                    >
                                        { categorias.map(({ link, name }, index) => (
                                            <option
                                                key={index}
                                                value={ link }
                                            >
                                                { name }
                                            </option>
                                        )) }
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        { errors.category }
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <div className="form-group">
                                    <input
                                        id="formImage"
                                        name="image"
                                        type="file"
                                        className="form-control-file"
                                        onChange={ _handleImage }
                                    />
                                </div>
                                <Form.Group
                                    controlId="formDesc"
                                >
                                    <Form.Control
                                        as="textarea"
                                        name="desc"
                                        value={ values.desc }
                                        onChange={ handleChange }
                                        isValid={ touched.desc && !errors.desc }
                                        isInvalid={ !!errors.desc }
                                        placeholder="Descripción"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        { errors.desc }
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group
                                    controlId="formPrice"
                                >
                                    <Form.Control
                                        type="number"
                                        name="price"
                                        value={ values.price }
                                        onChange={ handleChange }
                                        isValid={ touched.price && !errors.price }
                                        isInvalid={ !!errors.price }
                                        placeholder="Precio"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        { errors.price }
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Button
                                        variant="secondary"
                                        size="lg"
                                        className="mr-3"
                                        onClick={ _handleGoBack }
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        onClick={ handleSubmit }
                                    >
                                        Crear Anuncio
                                    </Button>
                                </Form.Group>
                            </Form>
                        ) }
                    </Formik>
                </FormWrapper>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        crearAnuncio: (anuncio, callback) => dispatch(crearAnuncio(anuncio, callback))
    }
}

export default compose(
    connect(null, mapDispatchToProps),
    withRouter
)(CrearAnuncio)
