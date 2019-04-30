import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import MUIIconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/FavoriteBorder'
import styled from '@emotion/styled'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'redux'
import classnames from 'classnames'

import {
    favoriteAnuncio,
    unfavoriteAnuncio
} from '../store/actions/anuncios'

const ButtonsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const IconButton = styled(MUIIconButton)`
    outline: none !important;
`

const styles = () => ({
    fav: {
        color: '#d32f2f'
    }
})

class CardAnuncio extends Component {
    static propTypes = {
        anuncio     : PropTypes.object.isRequired,
        isFavorite  : PropTypes.bool.isRequired,
        classes     : PropTypes.object.isRequired
    }

    _handleClickFavorite = () => {
        const {
            anuncio: {
                id
            },
            isFavorite,
            favorite,
            unfavorite
        } = this.props

        if (isFavorite) {
            unfavorite({ id })
        } else {
            favorite({ id })
        }
    }

    render () {
        const {
            props: {
                anuncio: {
                    id,
                    title,
                    image,
                    price
                },
                isFavorite,
                classes
            },
            _handleClickFavorite
        } = this

        return (
            <Card
                className="mb-4 shadow-sm"
            >
                <Card.Img variant="top" src={ image } />
                <Card.Body>
                    <Card.Title>{ title }</Card.Title>
                    <h4 className="card-text text-success mb-3"> { numeral(price).format('$0,0') } </h4>
                    <ButtonsWrapper>
                        <Link
                            to={ `/anuncio/${id}` }
                        >
                            <Button
                                variant="primary"
                            >
                                Detalle
                            </Button>
                        </Link>
                        <IconButton
                            className={ classnames({
                                [classes.fav]: isFavorite
                            }) }
                            onClick={ _handleClickFavorite }
                        >
                            <FavoriteIcon />
                        </IconButton>
                    </ButtonsWrapper>
                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const favorites = state.firebase.profile.favorites
    const isFavorite = favorites[ownProps.anuncio.id] ? true : false

    return {
        isFavorite
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        favorite    : ({ id }) => dispatch(favoriteAnuncio({ id })),
        unfavorite  : ({ id }) => dispatch(unfavoriteAnuncio({ id }))
    }
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withStyles(styles)
)(CardAnuncio)
