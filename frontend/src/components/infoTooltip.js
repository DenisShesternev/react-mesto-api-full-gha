function InfoTooltip({ isOpen, onClose, title, name, img }) {
    return (
         <section className={`popup ${isOpen ? 'popup__opened' : ''}`}>
            <div className='popup__container'>
                <div className='popup__auth'>
                    <img src={img} alt={img} className='popup__tooltip'/>

                    <h2 className='popup__title popup__title_type_tooltip'>{title}</h2>
                </div>
                <button
                    type='button'
                    className='popup__close-button'
                    aria-label='Закрыть'
                    onClick={onClose}
                />
            </div>
        </section>
    )
}

export default InfoTooltip;