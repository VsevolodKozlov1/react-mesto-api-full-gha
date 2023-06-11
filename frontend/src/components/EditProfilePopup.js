import React, { useEffect, useState } from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({
    isOpen,
    onClose,
    onUpdateUser
}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser(name, description);
    }


    useEffect(() => {
        if (currentUser.name) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser, isOpen]);


    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            submitValue="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                className="popup__input popup__input_personal-data_name"
                name="personal-data_name"
                placeholder="Имя"
                required minLength="2"
                maxLength="40"
                value={name}
                onChange={handleNameChange}
            />
            <span className="popup__span-error popup__span-error_personal-data_name"></span>
            <input
                type="text"
                className="popup__input popup__input_personal-data_about-me"
                name="personal-data_about-me"
                placeholder="О себе"
                required minLength="2"
                maxLength="200"
                value={description}
                onChange={handleDescriptionChange}
            />
            <span className="popup__span-error popup__span-error_personal-data_about-me"></span>
        </PopupWithForm>
    )
}