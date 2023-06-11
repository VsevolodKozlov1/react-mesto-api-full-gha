import headerLogo from '../images/header-logo.svg';
import { Link } from "react-router-dom";

export default function Header({
    isLoggedIn,
    email,
    onSignout
}) {
    let url = window.location.pathname;
    let redirectText = "";
    let redirectUrl = '/signin';
    if (isLoggedIn) {
        redirectText = "Выйти";
    } else {
        if (url === '/signup') {
            redirectText = "Войти"
        } else {
            redirectText = "Регистрация";
            redirectUrl = '/signup'
        }
    }

    return (
        <header className="header">
            <img src={headerLogo} alt={"Логотип"} className="header__logo" />
            <div className="header__container">
                {url === '/' && <p className="header__email">{email}</p>}
                <Link to={redirectUrl}
                    className="header__redirect button-hover"
                    onClick={isLoggedIn ? onSignout : ''}>
                    {redirectText}
                </Link>
            </div>
        </header>
    )
}