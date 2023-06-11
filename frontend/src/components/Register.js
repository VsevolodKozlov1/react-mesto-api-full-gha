import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ onRegister }) {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!userData.email || !userData.password) { return };
        onRegister(userData)
            .then(() => {
                setUserData({ email: "", password: "" });
            });
    }

    return (
        <div className="auth">
            <h2 className="auth__header">Регистрация</h2>
            <form className="auth__form"
                name="register-form"
                onSubmit={handleSubmit}
                noValidate
            >
                <input
                    type="email"
                    className="auth__input auth__input_register_email"
                    name="email"
                    placeholder="Email"
                    value={userData.email || ""}
                    onChange={handleChange}
                    required />
                <input
                    type="password"
                    className="auth__input auth__input_register_password"
                    name="password"
                    placeholder="Пароль"
                    value={userData.password || ""}
                    onChange={handleChange}
                    required />
                <button
                    type="submit"
                    className="auth__submit button-hover"
                >Зарегистрироваться</button>
            </form>
            <Link to="/sign-in" className="auth__login-link button-hover">
                Уже зарегистрированы? Войти
            </Link>
        </div>
    )
}