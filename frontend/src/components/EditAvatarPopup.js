import React from "react"
import PopupWithForm from "./PopupWithForm"

function EditAvatarPopup(props) {
    const avatarRef = React.useRef('')

    function handleSubmit(e) {
        e.preventDefault()
        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        })
    }

    React.useEffect(() => {
        avatarRef.current.value = ''
    }, [props.isOpen])

    return (
        <PopupWithForm
            name='avatar'
            title='Обновить аватар'
            buttonText='Сохранить'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__input popup__input_data_avatar"
                type="url"
                id="profileAvatar"
                placeholder="Ссылка на картинку"
                name="avatar"
                required
                ref={avatarRef}
            />
            <span className="popup__input-error profileAvatar-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup