export default function PopupWithForm({
    name,
    title,
    children,
    submitValue,
    isOpen,
    onClose,
    onSubmit
}) {
    return (
        <div className={`popup popup_section_${name} ${isOpen && 'popup_opened'}`}>
            <div className={`popup__container popup__container_${name}`}>
                <h2 className="popup__header">{title}</h2>
                <form
                    className={`popup__form popup__form_section_${name}`}
                    name={`${name}-form`}
                    onSubmit={onSubmit}
                    noValidate
                >
                    {children}
                    <button
                        type="submit"
                        className={`popup__submit popup__submit_section_${name} button-hover`}
                    >{submitValue}</button>
                </form>
                <button
                    type="button"
                    className="popup__close-button button-hover"
                    onClick={onClose}
                ></button>
            </div>
        </div>
    )
}