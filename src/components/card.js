import { addLike, removeLike} from './api.js';

const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

const handleLikeClick = (cardId, isLiked, likeButton, likeCounter) => {
    const likeMethod = isLiked ? removeLike : addLike;

    likeMethod(cardId)
        .then((updatedCard) => {
            likeButton.classList.toggle('card__like-button_is-active');
            likeCounter.textContent = updatedCard.likes.length;
        })
        .catch((err) => {
            console.log('Ошибка при обработке лайка:', err);
        });
};

export const createCard = (cardData, handleDeleteCard, openImageClick, userId) => {
    const cardElement = cardTemplate.cloneNode(true);
    const deleteBtn = cardElement.querySelector('.card__delete-button');
    const likeBtn = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.card__like-counter');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');

    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    likeCounter.textContent = cardData.likes.length;

    const isLiked = cardData.likes.some(user => user._id === userId);
    if (isLiked) {
        likeBtn.classList.add('card__like-button_is-active');
    }

    if (cardData.owner._id !== userId) {
        deleteBtn.style.display = 'none';
    }

    deleteBtn.addEventListener('click', () => {
        handleDeleteCard(cardData._id, cardElement);
    });

    cardImage.addEventListener('click', () => {
        openImageClick(cardData);
    });

    likeBtn.addEventListener('click', () => {
        const isLiked = likeBtn.classList.contains('card__like-button_is-active');
        const likeMethod = isLiked ? removeLike : addLike;

        likeMethod(cardData._id)
            .then((updatedCard) => {
                likeBtn.classList.toggle('card__like-button_is-active');
                likeCounter.textContent = updatedCard.likes.length;
            })
            .catch((err) => {
                console.log('Ошибка при обработке лайка:', err);
            });
    });

    return cardElement;
};

export { handleLikeClick as handleLikeCard };