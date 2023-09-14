function PopupWithForm({ isOpen, onClose, name, title, buttonText, children, onSubmit }) {  // реализовал закрытие по оверлею
    return (
        <section className={`popup popup_${name} ${isOpen ? 'popup__opened' : ''}`} onClick={onClose}>
            <div className="popup__container"
                onClick={(evt) => evt.stopPropagation()}>
                <button
                    type="button"
                    className="popup__close-button"
                    aria-label="Закрыть"
                    onClick={onClose}
                />
                <form
                    className={`popup__form popup__form_${name}`}
                    onSubmit={onSubmit}
                >
                    <h3 className="popup__title">{title}</h3>
                    <fieldset className={`popup__fieldset popup__fieldset_${name}`}>
                        {children}
                    </fieldset>
                    <button
                        type="submit"
                        className={`popup__save-button popup__save-button_${name}`}>{buttonText}</button>
                </form>
            </div>
        </section>
    )
}

export default PopupWithForm