import React from "react"
import Card from "./Card.js"
import { CurrentUserContext } from "../contexts/CurrentUserContext.js"

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, handleCardLike, handleCardDelete, cards }) {
    const currentUser = React.useContext(CurrentUserContext)

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img
                        src={currentUser.avatar}
                        alt="Аватар"
                        className="profile__avatar"
                    />
                    <button
                        className="profile__avatar-button"
                        onClick={onEditAvatar}
                    >
                    </button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button type="button"
                        className="profile__edit-button"
                        onClick={onEditProfile}
                    >
                    </button>
                    <p className="profile__add">{currentUser.about}</p>
                </div>
                <button type="button"
                    className="profile__add-button"
                    onClick={onAddPlace}
                >
                </button>
            </section>
            <ul className="elements">
                {cards.map((card) => (<Card key={card._id}
                        card={card}
                        onCardClick={onCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />))}
            </ul>
        </main>
    )
}

export default Main