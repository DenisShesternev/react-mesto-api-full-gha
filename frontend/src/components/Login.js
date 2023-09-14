import { useState } from "react";
import AuthPage from "./AuthPage";

function Login(props) {
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
        props.onLogin(email, password)
    }

    return (
        <section className="login">
            <AuthPage
                formName='login'
                onSubmit={handleSubmit}
                title='Вход'
                buttonText='Войти'
            >
                <input
                    name="Email"
                    className="popup_input popup__input_type_login"
                    placeholder="Email"
                    value={email || ''}
                    onChange={handleInputEmail}
                    required
                    minLength={4}
                    maxLength={50}
                />
                <input
                    name="Password"
                    className="popup_input popup__input_type_login"
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

export default Login