import React, { useEffect, useState } from "react";
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({
    isOpen,
    onClose,
    onAddPlace
}) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);


    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace(name, link);
    }

    return (
        <PopupWithForm
            name="gallery"
            title="Новое место"
            submitValue="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                className="popup__input popup__input_card_name"
                name="card_name" placeholder="Название"
                minLength="2"
                maxLength="30"
                required
                onChange={handleNameChange}
                value={name || ""}
            />
            <span className="popup__span-error popup__span-error_card_name"></span>
            <input
                type="url"
                className="popup__input popup__input_card_link"
                name="card_link"
                placeholder="Ссылка на картинку"
                required
                onChange={handleLinkChange}
                value={link || ""}
            />
            <span className="popup__span-error popup__span-error_card_link"></span>
        </PopupWithForm>
    )
}