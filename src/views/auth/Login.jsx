import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Formik } from "formik"
import { object, string } from "yup"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { logIn } from '../../store/actions/auth'

const schema = object({
    email: string()
        .email("Favor de ingresar un correo valido")
        .trim()
        .required("Favor de ingresar un correo")
        .default(''),
    password: string()
        .required("Favor de ingresar una contraseña")
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

class Login extends Component {
    _handleSubmit = (values, formik) => {
        const {
            logIn,
            history
        } = this.props

        if (!/^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(itesm)\.com$/.test(values.email)) {
            formik.setFieldError('email', 'Favor de ingresar un correo del ITESM')
        }

        logIn(values, () => {
            history.push('')
        })

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
                    <h1 className="mb-3"> Iniciar Sesion </h1>
                    <Formik
                        validationSchema={ schema }
                        // validateOnChange={ false }
                        onSubmit={ _handleSubmit }
                        initialValues={{
                            email       : '',
                            password    : ''
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
                                { authError ? (
                                    <Form.Group>
                                        <p className="text-danger"> { authError } </p>
                                    </Form.Group>
                                ) : null }
                                <Form.Group>
                                    <Link
                                        to="/signup"
                                    >
                                        Crear cuenta
                                    </Link>
                                </Form.Group>
                                <Form.Group>
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        block
                                        onClick={ handleSubmit }
                                    >
                                        Iniciar Sesion
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
        logIn: (values, callback) => dispatch(logIn(values, callback))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
