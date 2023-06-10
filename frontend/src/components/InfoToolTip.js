import authOk from '../images/auth-ok.svg';
import authNotOk from '../images/auth-nok.svg';

export default function InfoToolTip({
    isOpen,
    onClose,
    isRegistred
}) {
    return (
        <div className={`popup ${isOpen && 'popup_opened'}`}>
            <div className={`popup__container`}>
                <div className="popup__container_auth">
                    {isRegistred
                        ? <>
                            <img src={authOk} className="popup__auth-icon" />
                            <p className="popup__auth-tip">Вы успешно зарегистрировались!</p>
                        </>
                        : <>
                            <img src={authNotOk} className="popup__auth-icon" />
                            <p className="popup__auth-tip">Что-то пошло не так! Попробуйте еще раз.</p>
                        </>}
                </div>
                <button
                    type="button"
                    className="popup__close-button button-hover"
                    onClick={onClose}
                ></button>
            </div>
        </div>
    )
}