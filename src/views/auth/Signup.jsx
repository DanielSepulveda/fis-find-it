import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Formik } from "formik"
import { object, string } from "yup"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/auth'

const schema = object({
    name: string()
        .trim()
        .required("Favor de ingresar un nombre")
        .default(''),
    email: string()
        .email("Favor de ingresar un correo valido")
        .trim()
        .required("Favor de ingresar un correo")
        .default(''),
    password: string()
        .required("Favor de ingresar una contraseña")
        .trim()
        .default(''),
    confirmPassword: string()
        .required("Favor de confirmar contraseña")
        .trim()
        .default('')
})

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 40px 0px;
    height: 100vh;
`

const FormWrapper = styled.div`
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
`

class Signup extends Component {
    static propTypes = {
        signUp: PropTypes.func.isRequired
    }

    _handleSubmit = (values, formik) => {
        let error = false

        if (!/^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(itesm)\.com$/.test(values.email)) {
            formik.setFieldError('email', 'Favor de ingresar un correo del ITESM')
            error = true
        }
        if (values.password !== values.confirmPassword) {
            formik.setFieldError('confirmPassword', 'Las contraseñas deben coincidir')
            error = true
        }

        if (!error) {
            const {
                signUp
            } = this.props

            signUp(values)
        }
    }

    render () {
        const {
            props: {
                authError
            },
            _handleSubmit
        } = this

        return (
            <Container
                className="bg-light"
            >
                <FormWrapper
                    className="text-center"
                >
                    <h1 className="mb-3"> Crear cuenta </h1>
                    <Formik
                        validationSchema={ schema }
                        // validateOnChange={ false }
                        onSubmit={ _handleSubmit }
                        initialValues={{
                            name                : '',
                            email               : '',
                            password            : '',
                            confirmPassword     : ''
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
                                    controlId="formName"
                                >
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={ values.name }
                                        onChange={ handleChange }
                                        isValid={ touched.name && !errors.name }
                                        isInvalid={ !!errors.name }
                                        placeholder="Nombre"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        { errors.name }
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group
                                    controlId="formEmail"
                                >
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={ values.email }
                                        onChange={ handleChange }
                                        isValid={ touched.email && !errors.email }
                                        isInvalid={ !!errors.email }
                                        placeholder="Correo"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        { errors.email }
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group
                                    controlId="formPassword"
                                >
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={ values.password }
                                        onChange={ handleChange }
                                        isValid={ touched.password && !errors.password }
                                        isInvalid={ !!errors.password }
                                        placeholder="Contraseña"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        { errors.password }
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group
                                    controlId="formConfirmPassword"
                                >
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        value={ values.confirmPassword }
                                        onChange={ handleChange }
                                        isValid={ touched.confirmPassword && !errors.confirmPassword }
                                        isInvalid={ !!errors.confirmPassword }
                                        placeholder="Confirmar contraseña"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        { errors.confirmPassword }
                                    </Form.Control.Feedback>
                                </Form.Group>
                                { authError ? (
                                    <Form.Group>
                                        <p className="text-danger"> { authError } </p>
                                    </Form.Group>
                                ) : null }
                                <Form.Group>
                                    <Link
                                        to="/login"
                                    >
                                        Iniciar Sesion
                                    </Link>
                                </Form.Group>
                                <Form.Group>
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        block
                                        onClick={ handleSubmit }
                                    >
                                        Crear cuenta
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

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: values => dispatch(signUp(values))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup)
