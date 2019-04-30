import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import Navbar from '../../components/Navbar'

const Main = styled.main`
    padding-top: 60px !important
`

class MainLayout extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired
    }

    render () {
        const {
            children
        } = this.props

        return (
            <>
                <Navbar />
                <Main>
                    { children }
                </Main>
            </>
        )
    }
}

export default MainLayout
