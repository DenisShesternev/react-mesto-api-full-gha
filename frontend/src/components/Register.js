import { useState } from "react";
import AuthPage from "./AuthPage";

function Register(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleInputEmail(evt) {
        setEmail(evt.target.value)
    }

    function handleInputPassword(evt) {
        setPassword(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        props.onRegister(email, password)
    }

    return (
        <section className="register">
            <AuthPage
                formName='register'
                onSubmit={handleSubmit}
                title='Регистрация'
                buttonText='Зарегистрироваться'
            >
                <input
                    name="Email"
                    className="popup__input popup__input_type_login"
                    placeholder="Email"
                    value={email || ''}
                    onChange={handleInputEmail}
                    required
                    minLength={4}
                    maxLength={50}
                />
                <input
                    name="Password"
                    className="popup__input popup__input_type_login"
                    placeholder="Пароль"
                    value={password || ''}
                    onChange={handleInputPassword}
                    required
                    minLength={8}
                    maxLength={20}
                />
            </AuthPage>
        </section>
    )
}

export default Register