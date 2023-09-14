import React from "react"
import { Link } from "react-router-dom"

function AuthPage({ onSubmit, children, title, buttonText, formName }) {
    return (
        <div className="auth-page">
            <form
                className="auth-page__form"
                name={formName}
                onSubmit={onSubmit}
            >
                <h2 className="auth-page__title">{title}</h2>
                {children}
                <button
                    className="auth-page__button"
                    type="submit">
                    {buttonText}
                </button>
                {formName === 'register' &&
                    <Link
                        className="auth-page__link"
                        to='/sign-in'
                    >Уже зарегистрированы ? Войти
                    </Link>}
            </form>
        </div>
    )
}

export default AuthPage