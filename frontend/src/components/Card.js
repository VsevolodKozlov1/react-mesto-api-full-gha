import React, { useEffect, useState } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';


export default function Card({
    card,
    onCardClick,
    onCardLike,
    onCardDelete,
}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `gallery__like-button button-hover ${isLiked
        ? 'gallery__like-button_active'
        : ''}`;

    function handleClick() {
        onCardClick(card);
    }

    function handleLike() {
        onCardLike(card);
    }

    function handleDelete() {
        onCardDelete(card);
    }

    return (
        <div className="gallery__item">
            <div className="gallery__img-placeholder">
                <img
                    src={card.link}
                    alt={card.name}
                    className="gallery__photo"
                    onClick={handleClick}
                />
            </div>
            {isOwn && <button
                type="button"
                className="gallery__del-button button-hover"
                onClick={handleDelete}
            ></button>}
            <div className="gallery__caption">
                <h2 className="gallery__item-descr">{card.name}</h2>
                <div className="gallery__like">
                    <button
                        type="button"
                        className={cardLikeButtonClassName}
                        onClick={handleLike}
                    ></button>
                    <p className="gallery__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}