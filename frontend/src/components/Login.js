import React, { useState } from "react";

export default function Login({ onSignin }) {
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
        onSignin(userData)
            .then(() => {
                setUserData({ email: "", password: "" });
            });
    }
    return (
        <div className="auth">
            <h2 className="auth__header">Вход</h2>
            <form className="auth__form"
                name="login-form"
                onSubmit={handleSubmit}
                noValidate
            >
                <input
                    type="email"
                    className="auth__input auth__input_login_email"
                    name="email"
                    placeholder="Email"
                    value={userData.email || ""}
                    onChange={handleChange}
                    required />
                <input
                    type="password"
                    className="auth__input auth__input_login_password"
                    name="password"
                    placeholder="Пароль"
                    value={userData.password || ""}
                    onChange={handleChange}
                    required />
                <button
                    type="submit"
                    className="auth__submit button-hover"
                >Войти</button>
            </form>
        </div>
    )
}