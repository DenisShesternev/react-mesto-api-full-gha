import React from "react"
import PopupWithForm from "./PopupWithForm"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

function EditProfilePopup(props) {
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const currentUser = React.useContext(CurrentUserContext)

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        props.onUpdateUser({
            name,
            about: description
        })
    }

    React.useEffect(() => {
        if (props.isOpen) {
            setName(currentUser.name)
            setDescription(currentUser.about)
        }
    }, [props.isOpen, currentUser])

    return (
        <PopupWithForm
            name='profile'
            title='Редактировать профиль'
            buttonText='Сохранить'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input className="popup__input popup__input_data_name"
                type="text"
                id="profileName"
                placeholder="Ваше имя"
                minLength="2"
                maxLength="40"
                name="profile"
                required
                value={name || ''}
                onChange={handleChangeName}
            />
            <span className="popup__input-error profileName-error"></span>
            <input className="popup__input popup__input_data_add"
                type="text"
                id="profileInfo"
                placeholder="Ваш род занятий"
                minLength="2"
                maxLength="200"
                name='info'
                required
                value={description || ''}
                onChange={handleChangeDescription}
            />
            <span className="popup__input-error profileInfo-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup