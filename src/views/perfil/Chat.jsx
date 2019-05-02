import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import styled from '@emotion/styled'
import MUIButton from '@material-ui/core/Button'
import BackIcon from '@material-ui/icons/ArrowBack'
import Paper from '@material-ui/core/Paper'
import { Formik } from "formik"
import { object, string } from "yup"
import Form from 'react-bootstrap/Form'
import BButton from 'react-bootstrap/Button'

import Main from '../layouts/Main'
import { crearMensaje } from '../../store/actions/mensajes'

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

const ChatContainer = styled.div`
    background-color: #e0e0e0;
    width: 350px;
    height: 500px;
    max-height: 500px;
    margin: auto;
    display: flex;
    flex-direction: column;
    padding: 16px;
    overflow: auto;
    @media (min-width: 540px) {
        width: 500px;
    }
    @media (min-width: 740px) {
        width: 700px;
    }
`

const SendContainer = styled.div`
    width: 350px;
    margin: auto;
    margin-top: 16px;
    @media (min-width: 540px) {
        width: 500px;
    }
    @media (min-width: 740px) {
        width: 700px;
    }
`

const MessageWrapperLeft = styled.div`
    display: flex;
    margin-top: 16px;
`

const MessageWrapperRight = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
`

const Message = styled(Paper)`
    padding: 2px 8px;
`

const schema = object({
    message: string()
        .required("Favor de ingresar un mensaje")
        .trim()
        .default('')
})

class Chat extends Component {
    constructor (props) {
        super(props)
        this.formRef = React.createRef()
    }

    static propTypes = {
        chat: PropTypes.object
    }

    static defaultProps = {
        chats: {}
    }

    _handleGoBack = () => {
        const {
            history
        } = this.props

        history.goBack()
    }

    _handleSubmit = values => {
        const {
            props: {
                currentUser,
                crearMensaje,
                match
            },
            formRef: {
                current: currentForm
            }
        } = this

        const payload = {
            sender: {
                id      : currentUser.id,
                name    : currentUser.name
            },
            content: values,
            chatId: match.params.id
        }

        crearMensaje(payload)

        currentForm.resetForm({
            message: ''
        })
    }

    render () {
        const {
            props: {
                chat,
                currentUser
            },
            _handleGoBack,
            _handleSubmit,
            formRef
        } = this

        let mensajes = []

        if (chat) {
            mensajes = chat.messages
        }

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
                    { !chat ? (
                            <div className="mt-3 d-flex justify-content-center align-items-center">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h1 className="display-2 text-center mb-5"> { chat.anuncio.title } </h1>
                                <ChatContainer>
                                    { mensajes.map((m, index) => {
                                        if (m.sender.id !== currentUser.id) {
                                            return (
                                                <MessageWrapperLeft
                                                    key={ index }
                                                >
                                                    <Message
                                                        elevation={1}
                                                    >
                                                        { m.content.message }
                                                    </Message>
                                                </MessageWrapperLeft>
                                            )
                                        } else {
                                            return (
                                                <MessageWrapperRight
                                                    key={ index }
                                                >
                                                    <Message
                                                        elevation={1}
                                                    >
                                                        { m.content.message }
                                                    </Message>
                                                </MessageWrapperRight>
                                            )
                                        }
                                    }) }
                                </ChatContainer>
                                <SendContainer>
                                    <Formik
                                        ref={ formRef }
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
                                </SendContainer>
                            </div>
                        )
                    }
                </Layout>
            </Main>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const chatId = ownProps.match.params.id
    const chats = state.firestore.data.chats || {}
    const chat = chats[chatId] || null

    const uid = state.firebase.auth.uid
    const user = state.firebase.profile
    const currentUser = {
        id: uid,
        ...user
    }

    return {
        chat,
        currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        crearMensaje: (payload) => dispatch(crearMensaje(payload))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'chats' }
    ])
)(Chat)
