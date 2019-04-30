import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {
    Redirect,
    Route
} from 'react-router-dom'

class PrivateRoute extends Component {
    static propTypes = {
        isLogedIn: PropTypes.bool.isRequired
    }

    render () {
        const {
            isLogedIn,
            ...restProps
        } = this.props

        if (!isLogedIn) {
            return (
                <Redirect
                    to="/login"
                />
            )
        }

        return (
            <Route
                { ...restProps }
            />
        )
    }
}

const mapStateToProps = (state) => {
    const auth = state.firebase.auth
    return {
        isLogedIn: !auth.isEmpty
    }
}

export default compose(
    connect(mapStateToProps)
)(PrivateRoute)
