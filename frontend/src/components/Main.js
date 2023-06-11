import React, { useEffect, useState } from "react";
import editIconBig from '../images/edit-icon_big.svg';
import editIcon from '../images/edit-icon.svg';
import addIcon from '../images/add-icon.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main({
    cards,
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    onCardLike,
    onCardDelete
}) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <img src={currentUser.avatar} alt={"Аватар"} className="profile__avatar" />
                <div className="profile__avatar-hover" onClick={onEditAvatar}>
                    <img src={editIconBig} alt={"Редактировать"} className="profile__avatar-change" />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button
                        type="button"
                        className="profile__edit-button button-hover"
                        onClick={onEditProfile}
                    >
                        <img src={editIcon} alt={"Редактировать"} className="profile__edit-icon" />
                    </button>
                    <p className="profile__about-me">{currentUser.about}</p>
                </div>
                <button
                    type="button"
                    className="profile__add-button button-hover"
                    onClick={onAddPlace}
                >
                    <img src={addIcon} alt={"Добавить"} className="profile__add-icon" />
                </button>
            </section>
            <section className="gallery">
                {cards.map(card => (
                    <Card
                        card={card}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                        key={card._id}
                    />
                ))}
            </section>
        </main>
    )
}