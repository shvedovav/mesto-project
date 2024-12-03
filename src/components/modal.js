const openModal = (popup) => {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleCloseEsc);
    document.addEventListener('click', closeOverlay);
};

const closeModal = (popup) => {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleCloseEsc);
    document.removeEventListener('click', closeOverlay);
};

const handleCloseEsc = (evt) => {
    if (evt.key === 'Escape') {
        const popupActive = document.querySelector('.popup_is-opened');
        closeModal(popupActive);
    }
};


const closeOverlay = (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
        closeModal(evt.target);
    }
};

export {openModal, closeModal};