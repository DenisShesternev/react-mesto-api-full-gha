import React from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext)

    const isOwn = props.card.owner === currentUser._id
    const cardDeleteButtonClassName = (
        `element__button-remuve ${isOwn ? '' : 'element__button-remuve_inactive'}`
    )

    const isLiked = props.card.likes.some((item) => item === currentUser._id)
    const CardLikeButtonClassName = (
        `element__button-like ${isLiked ? 'element__button-like_active' : ''}`
    )

    function handleCardClick() {
        props.onCardClick(props.card)
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }

    return (
        <li className="element">
            <img
                src={props.card.link}
                alt={props.card.name}
                className="element__img"
                onClick={handleCardClick}
            />
            <div className="element__container">
                <h2 className="element__mesto">{props.card.name}</h2>
                <div className="element__like_container">
                    <button
                        type="button"
                        className={CardLikeButtonClassName}
                        onClick={handleLikeClick}
                    >
                    </button>
                    <span className="element__like_count">{props.card.likes.length}</span>
                </div>
            </div>
            <button
                className={cardDeleteButtonClassName}
                onClick={handleDeleteClick}
            >
            </button>
        </li>
    )
}

export default Card