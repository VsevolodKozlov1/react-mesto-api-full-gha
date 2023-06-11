import React, { useEffect, useState } from "react";
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({
    isOpen,
    onClose,
    onUpdateAvatar
}) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(avatarRef.current.value);
    }

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            submitValue="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="url"
                className="popup__input popup__input_avatar_link"
                name="avatar_link"
                placeholder="Укажите ссылку"
                required
                ref={avatarRef}
            />
            <span className="popup__span-error popup__span-error_avatar_link"></span>
        </PopupWithForm>
    )
}