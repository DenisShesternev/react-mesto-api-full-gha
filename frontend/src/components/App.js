import React from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import * as auth from '../utils/auth'
import Header from './Header.js'
import Footer from './Footer.js'
import Main from './Main.js'
import PopupWithForm from './PopupWithForm.js'
import ImagePopup from './ImagePopup.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import { api } from '../utils/api'
import EditAvatarPopup from './EditAvatarPopup.js'
import EditProfilePopup from './EditProfilePopup.js'
import AddPlacePopup from './AddPlacePopup.js'
import ProtectedRoute from './ProtectedRoute.js'
import Login from './Login'
import Register from './Register.js'
import InfoTooltip from './infoTooltip'
import succes from '../images/succes.svg'
import unsucces from '../images/Unsucces.svg'

function App() {
    const navigate = useNavigate()

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setEditPlaceOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setEditAvatarOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState(null)
    const [currentUser, setCurrentUser] = React.useState({})
    const [cards, setCards] = React.useState([])
    const [loggedIn, setLoggedIn] = React.useState(false)
    const [infoTooltip, setInfoTooltip] = React.useState(false);
    const [email, setEmail] = React.useState('')
    const [popupImage, setPopupImage] = React.useState('');
    const [popupTitle, setPopupTitle] = React.useState('');

    function onRegister(email, password) {
        auth.register(email, password).then(() => {
            setPopupImage(succes)
            setPopupTitle('Вы успешно зарегистрировались!')
            navigate('/sign-in')
        }).catch(() => {
            setPopupImage(unsucces)
            setPopupTitle('Что-то пошло не так! Попробуйте ещё раз.')
        }).finally(handleInfoTooltip)
    }

    function onLogin(email, password) {
        auth.login(email, password).then((res) => {
            localStorage.setItem("jwt", res.token);
            setLoggedIn(true);
            setEmail(email);
            navigate("/");
        }).catch(() => {
            setPopupImage(unsucces);
            setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
            handleInfoTooltip();
        });
    }

    function onSignOut() {
        setLoggedIn(false)
        setEmail(null)
        navigate('/sign-in')
        localStorage.removeItem('jwt')
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true)
    }

    function handleEditPlaceClick() {
        setEditPlaceOpen(true)
    }

    function handleEditAvatarClick() {
        setEditAvatarOpen(true)
    }

    function handleInfoTooltip() {
        setInfoTooltip(true);
    }

    function onCardClick(card) {
        setSelectedCard(card)
    }

    function closeAllPopups() {
        setEditProfilePopupOpen(false)
        setEditPlaceOpen(false)
        setEditAvatarOpen(false)
        setSelectedCard(null)
        setInfoTooltip(false)
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
            })
            .catch((err) => console.log(err))
    }

    function handleCardDelete(card) {
        api.delete(card._id)
            .then(() => {
                setCards((item) => item.filter((c) => c._id !== card._id))
            })
            .catch((err) => console.log(err))
    }

    function handleUpdateUser(userData) {
        api.setUserInfoApi(userData)
            .then((data) => {
                setCurrentUser(data)
                closeAllPopups()
            })
            .catch((err) => console.log(err))
    }

    function handleUpdateAvatar(userData) {
        api.handleUserAvatar(userData)
            .then((data) => {
                setCurrentUser(data)
                closeAllPopups()
            })
            .catch((err) => console.log(err))
    }

    function handleAddPlaceSubmit(cardData) {
        api.addUserCard(cardData)
            .then((newCard) => {
                setCards([newCard, ...cards])
                closeAllPopups()
            })
            .catch((err) => console.log(err))
    }

    React.useEffect(() => {
        if (loggedIn) {
            api.getInitialCards()
                .then((data) => {
                    setCards(data.reverse())
                })
                .catch((err) => console.log(err))
            api.getUserInfo()
                .then((data) => {
                    setCurrentUser(data.user)
                })
                .catch((err) => console.log(err))
        }
    }, [loggedIn])

    React.useEffect(() => {
        const jwt = localStorage.getItem('jwt')
        if (jwt) {
            auth.checkToken(jwt).then((res) => {
                if (res) {
                    setLoggedIn(true)
                    setEmail(res.user.email)
                }
            }).catch((err) => console.log(err)
            )
        }
    }, [])

    React.useEffect(() => {
        if (loggedIn) {
            navigate('/')
        }
    }, [loggedIn, navigate])

    React.useEffect(() => {
        if (isEditProfilePopupOpen || isEditAvatarPopupOpen || isAddPlacePopupOpen || selectedCard || infoTooltip) {
            function handleEsc(evt) {
                if (evt.key === 'Escape') {
                    closeAllPopups()
                }
            } document.addEventListener('keydown', handleEsc)
            return () => {
                document.removeEventListener('keydown', handleEsc)
            }
        }
    }, [isEditProfilePopupOpen || isEditAvatarPopupOpen || isAddPlacePopupOpen || selectedCard || infoTooltip])

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Routes>
                    <Route path='/sign-in' element={
                        <>
                            <Header title='Регистрация' route='/sign-up' />
                            <Login onLogin={onLogin} />
                        </>
                    } />
                    <Route path='/sign-up' element={
                        <>
                            <Header title='Войти' route='/sign-in' />
                            <Register onRegister={onRegister} />
                        </>
                    } />
                    <Route exact path='/' element={
                        <>
                            <Header title='Выйти' mail={email} onClick={onSignOut} route='' />
                            <ProtectedRoute
                                element={Main}
                                loggedIn={loggedIn}
                                onEditAvatar={handleEditAvatarClick}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleEditPlaceClick}
                                onCardClick={onCardClick}
                                handleCardLike={handleCardLike}
                                handleCardDelete={handleCardDelete}
                                cards={cards}
                            />
                            <Footer />
                        </>
                    } />
                    <Route path="*" element={<Navigate to={loggedIn ? "/" : "/sign-in"} />} />
                </Routes>
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />
                <PopupWithForm
                    name='delete'
                    title='Вы уверены ?'
                    buttonText='Да'
                    onClose={closeAllPopups}
                />
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />
                <InfoTooltip
                    img={popupImage}
                    title={popupTitle}
                    isOpen={infoTooltip}
                    onClose={closeAllPopups}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
