import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Register from './Register';
import Login from './Login';
import InfoToolTip from './InfoToolTip';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ProtectedRoute from './ProtectedRoute';
import api from '../utils/api';
import apiAuth from '../utils/apiAuth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistred, setIsRegistred] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    tokenCheck();
  }, []);


  useEffect(() => {
    api.getUserData()
      .then(data => { setCurrentUser(data) })
      .catch(err => { console.log(err) })
  }, []);

  useEffect(() => {
    api.getInitialCards()
      .then(data => { setCards(data); })
      .catch(err => { console.log(err) })
  }, [])

  function onSignin({ email, password }) {
    return apiAuth.signin(email, password).then(data => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        setEmail(email);
        navigate("/");
      }
    })
      .catch(err => {
        alert(`Что-то пошло не так! ${err}`);
      })
      ;
  }

  function onRegister({ email, password }) {
    return apiAuth.signup(email, password).then(res => {
      setIsRegistred(true);
      setIsInfoToolTipOpen(true);
      navigate("/sign-in");
    })
      .catch(() => {
        setIsInfoToolTipOpen(true);
      })
  }

  function onSignout() {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  }

  function tokenCheck() {
    const JWT = localStorage.getItem("token");
    if (JWT) {
      apiAuth.tokenValidityCheck(JWT).then(data => {
        setIsLoggedIn(true);
        setEmail(data.data.email);
        navigate("/");
      })
      .catch(err => {
        alert(`Что-то пошло не так! ${err}`);
      })
    }
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setIsInfoToolTipOpen(false);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleUpdateUser(name, about) {
    api.patchUserData(name, about)
      .then(newUserData => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch(err => { console.log(err) });
  }

  function handleUpdateAvatar(avatar) {
    api.patchAvatar(avatar)
      .then(newUserData => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch(err => { console.log(err) });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c));
      })
      .catch(err => { console.log(err) });
  }

  function handleCardDelete(card) {
    api.deteteCard(card._id)
      .then(() => {
        setCards(cards.filter(item => item._id !== card._id))
      })
      .catch(err => { console.log(err) })
  }

  function handleAddPlaceSubmit(name, link) {
    api.postNewCard(name, link)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => { console.log(err) })
  }



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          email={email}
          onSignout={onSignout}
        />
        <Routes>
          <Route path='/'
            element={<ProtectedRoute
              isLoggedIn={isLoggedIn}
              component={Main}
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />} />


          <Route path='/sign-up'
            element={<Register onRegister={onRegister} />}
          />

          <Route path='/sign-in'
            element={<Login onSignin={onSignin} />}
          />

          <Route
            path="*"
            element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />}
          />

        </Routes>

        <Footer />

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
          name="delete-card"
          title="Вы уверены?"
          submitValue="Да"
          onClose={closeAllPopups}
        >
        </PopupWithForm>

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        <InfoToolTip
          isOpen={isInfoToolTipOpen}
          isRegistred={isRegistred}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
