import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link as RLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import classnames from 'classnames'
import Button from 'react-bootstrap/Button'
import styled from '@emotion/styled'
import { connect } from 'react-redux'
import { logOut } from '../store/actions/auth'
import { compose } from 'redux'
import MUIIconButton from '@material-ui/core/IconButton'
import AccountIcon from '@material-ui/icons/AccountCircle'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import categorias from '../data/categorias'

const NavButton = styled.div`
    padding: .5rem 1rem;
    cursor: pointer;
    padding-right: 0;
    padding-left: 0;
`

const IconButton = styled(MUIIconButton)`
    outline: none !important;
`

const Link = styled(RLink)`
    :hover {
        text-decoration: none;
    }
`

class AppNavbar extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired
    }

    state = {
        openMenu: null
    }

    _handleLogOut = () => {
        const {
            logOut
        } = this.props

        logOut()
    }

    _handleOpenMenu = event => {
        this.setState({
            openMenu: event.currentTarget
        })
    }

    _handleCloseMenu = () => {
        this.setState({
            openMenu: null
        })
    }

    render () {
        const {
            props: {
                location
            },
            state: {
                openMenu
            },
            _handleLogOut,
            _handleOpenMenu,
            _handleCloseMenu
        } = this

        const params = new URLSearchParams(location.search)
        const category = params.get('c') || undefined

        return (
            <Navbar
                bg="dark"
                expand="lg"
                fixed="top"
                className="text-white"
            >
                <Link
                    to="/"
                >
                    <Navbar.Brand
                        className="text-white"
                    >
                        Find It
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="text-white">
                    <Nav className="mr-auto">
                        { categorias.map(({ name, link }, index) => (
                            <Link
                                key={ `${link}-${index}` }
                                to={{
                                    pathname    : "/anuncios",
                                    search      : `?c=${link}`
                                }}
                                className={ classnames("nav-link", {
                                    'text-white-50' : category !== link,
                                    'text-light'    : category === link
                                }) }
                            >
                                { name }
                            </Link>
                        )) }
                        <div
                            className="d-lg-none mt-3"
                        >
                            <p>
                                PERFIL
                            </p>
                            <Link
                                to="/misAnuncios"
                            >
                                <NavButton>
                                    Mis Anuncios
                                </NavButton>
                            </Link>
                            <Link
                                to="/misFavoritos"
                                className="mt-1"
                            >
                                <NavButton>
                                    Mis Favoritos
                                </NavButton>
                            </Link>
                            <Link
                                to="/misChats"
                                className="mt-1"
                            >
                                <NavButton>
                                    Mis Chats
                                </NavButton>
                            </Link>
                            <NavButton
                                className="mt-3"
                                onClick={ _handleLogOut }
                            >
                                Cerrar Sesion
                            </NavButton>
                        </div>
                    </Nav>
                </Navbar.Collapse>
                <div
                    className="mr-3 d-none d-lg-block"
                >
                    <IconButton
                        color="primary"
                        onClick={ _handleOpenMenu }
                    >
                        <AccountIcon />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        open={ Boolean(openMenu) }
                        onClose={ _handleCloseMenu }
                        anchorEl={ openMenu }
                        disableAutoFocusItem
                    >
                            <Link
                                to="/misAnuncios"
                            >
                                <MenuItem>
                                    Mis Anuncios
                                </MenuItem>
                            </Link>
                            <Link
                                to="/misFavoritos"
                            >
                                <MenuItem>
                                    Mis Favoritos
                                </MenuItem>
                            </Link>
                            <Link
                                to="/misChats"
                            >
                                <MenuItem>
                                    Mis Chats
                                </MenuItem>
                            </Link>
                        ))}
                    </Menu>
                </div>
                <Button
                    className="d-none d-lg-block"
                    variant="primary"
                    size="sm"
                    onClick={ _handleLogOut }
                >
                    Cerrar sesion
                </Button>
            </Navbar>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(logOut())
    }
}

export default compose(
    connect(null, mapDispatchToProps),
    withRouter
)(AppNavbar)
