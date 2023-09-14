function ImagePopup(props) {
    return (
        <section className={`popup popup_image ${props.card ? 'popup__opened' : ''}`} onClick={props.onClose}>
            <div className="popup__image-container"
                onClick={(evt) => evt.stopPropagation()}>
                <button type="button"
                    className="popup__close-button"
                    aria-label="Закрыть"
                    onClick={props.onClose}
                >
                </button>
                <img src={props.card ? props.card.link : '#'}
                    alt={props.card ? props.card.name : ''}
                    className="popup__img" />
                <p className="popup__name">
                    {props.card ? props.card.name : ''}
                </p>
            </div>
        </section>
    )
}

export default ImagePopup