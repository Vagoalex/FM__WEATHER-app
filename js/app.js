import { UI } from './view/UI.js';
import { showAlertEmptyInput, renderTime, switchTabs, URL } from './libs/helpers.js';
import { storage } from './libs/storage.js';
import { fetchWeather, renderWeather } from './libs/fetchWeather.js';
import { addFavorites, displayCity, deleteCity, fetchSelectedCity } from './view/view.js';

function startApp() {
	switchTabs();
	storage.favorList = storage.getStorage();
	displayCity();
	fetchSelectedCity();
	deleteCity();
}
startApp();

UI.GLOBAL.SEARCH.addEventListener('click', event => {
	event.preventDefault();
	const isEmptyInput = UI.GLOBAL.INPUT.value.length === 0;
	if (isEmptyInput) {
		showAlertEmptyInput(UI.GLOBAL.INPUT);
		return;
	}
	fetchWeather(UI.GLOBAL.INPUT.value);
	// fetchForecast(UI.GLOBAL.INPUT.value); // TODO: in future
});

UI.GLOBAL.LIKE.addEventListener('click', e => {
	addFavorites();
	deleteCity();
});

// if (favoriteIncludeCity) {
// 	alert('This city already exists in favorites!');
// } else if (emptyInput) {
// 	alert('This city is not valid!');
// 	// МОЖНО ВСТАВИТЬ ФУНКЦИЮ НА UI VIEW
// } else {
// 	favoriteCities.push(currentCity);
// }
// renderFavoriteCities();
// createTemplate(currentCity);
// storage.setStorage(favorList, currentCity);

// function renderFavoriteCities(city) {
// 	// for (let item of UI.LOCATIONS.children) {
// 	// 	if (item === city) {
// 	//
// 	// 	} else {
// 	// 		return;
// 	// 	}
// 	// }
// }

// function renderFavorites() {
// 	UI.GLOBAL.LOCATIONS.innerHTML = '';
// 	favorList.forEach(item => {
// 		const addedCity = `;
// 		<p class="city">${item}<span class="city-delete"></span></p>`;
// 		UI.GLOBAL.LOCATIONS.insertAdjacentHTML('beforeend', addedCity);
// 	});
// 	localStorage.setItem('favoriteCities', JSON.stringify([...favoriteCities]));
// }

// UI.LOCATIONS.addEventListener('click', e => {
// 	let btnDelete = document.querySelectorAll('.city-delete');
// 	let spanCity = e.target;

// 	let getStorage = JSON.parse(localStorage.getItem('favoriteCities'));
// 	// console.log(UI.LOCATIONS.children);

// 	btnDelete.forEach(item => {
// 		if (spanCity !== item) {
// 			return;
// 		} else {
// 			spanCity.parentNode.remove();
// 		}
// 	});

// 	localStorage.setItem('favoriteCities', JSON.stringify([...getStorage.filter(city => city !== spanCity.parentNode.textContent)]));
// });
// console.log(UI.LOCATIONS);

// function fetchFavorites(params) {
// 	UI.LOCATIONS.addEventListener('click', e => {
// 		let spanCity = e.target;
// 		console.log(spanCity.lastElementChild);
// 	});
// }
// fetchFavorites();
