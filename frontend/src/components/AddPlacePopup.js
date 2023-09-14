import React from "react"
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup(props) {
    const [name, setName] = React.useState('')
    const [link, setLink] = React.useState('')

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeLink(e) {
        setLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        props.onAddPlace({
            name,
            link
        })
        props.onClose()
    }

    React.useEffect(() => {
        if (props.isOpen) {
            setName('')
            setLink('')
        }
    }, [props.isOpen])

    return (
        <PopupWithForm
            name='card'
            title='Новое место'
            buttonText='Сохранить'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input className="popup__input popup__input_card_name"
                name='name'
                type="text"
                id="cardName"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                required
                value={name || ''}
                onChange={handleChangeName}
            />
            <span className="popup__input-error cardName-error"></span>
            <input type="url"
                className="popup__input popup__input_card_link"
                name='link'
                id="cardUrl"
                placeholder="Ссылка на картинку"
                required
                value={link || ''}
                onChange={handleChangeLink}
            />
            <span className="popup__input-error cardUrl-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup