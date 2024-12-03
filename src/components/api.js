const config = {
	baseUrl: 'https://nomoreparties.co/v1/frontend-st-cohort-201',
	headers: {
		authorization: 'c9dec9c8-e28c-4f62-b493-569ea8352045',
		'Content-Type': 'application/json',
	},
}

// Function to handle server response
function getResponse(res) {
	if (res.ok) {
		return res.json()
	}
	return Promise.reject(`Error: ${res.status}`)
}

// Function to fetch user data
export function getUserInfo() {
	return fetch(`${config.baseUrl}/users/me`, {
		method: 'GET',
		headers: config.headers,
	}).then(getResponse)
}

// Function to fetch cards from the server
export function getInitialCards() {
	return fetch(`${config.baseUrl}/cards`, {
		method: 'GET',
		headers: config.headers,
	}).then(getResponse)
}

// Function to update user data
export function updateUserInfo(name, about) {
	return fetch(`${config.baseUrl}/users/me`, {
		method: 'PATCH',
		headers: {
			...config.headers, // Preserve existing headers
			'Content-Type': 'application/json', // Specify Content-Type
		},
		body: JSON.stringify({
			name: name,
			about: about,
		}),
	}).then(getResponse)
}

// Function to add a new card
export function addCard(name, link) {
	return fetch(`${config.baseUrl}/cards`, {
		method: 'POST',
		headers: {
			...config.headers, // Preserve existing headers
			'Content-Type': 'application/json', // Specify Content-Type
		},
		body: JSON.stringify({
			name: name,
			link: link,
		}),
	}).then(getResponse)
}

// Function to add a like to a card
export function addLike(cardId) {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: 'PUT',
		headers: config.headers,
	}).then(getResponse)
}

// Function to remove a like from a card
export function removeLike(cardId) {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: 'DELETE',
		headers: config.headers,
	}).then(getResponse)
}

// Function to delete a card
export function deleteCard(cardId) {
	return fetch(`${config.baseUrl}/cards/${cardId}`, {
		method: 'DELETE',
		headers: config.headers,
	}).then(getResponse)
}

// Function to update avatar
export function updateAvatar(avatarLink) {
	return fetch(`${config.baseUrl}/users/me/avatar`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			avatar: avatarLink,
		}),
	}).then(getResponse)
}
