import { UI } from './UI.js';
import { storage, favorList } from '../libs/storage.js';
import { fetchWeather, renderWeather } from '../libs/fetchWeather.js';
export { addFavorites, displayCity, fetchOrDeleteCity };

function addFavorites() {
	const currentCity = UI.NOW.NAME.textContent;
	const isEmptyInput = currentCity == 'Name of city';
	if (isEmptyInput) {
		alert('This city is not valid!');
	} else {
		storage.setStorage(currentCity);
	}
	displayCity();
}
function displayCity() {
	UI.GLOBAL.LOCATIONS.innerHTML = '';
	// или же storage.getStorage();? снизу перед форычем
	[...favorList].forEach(city => {
		const newCity = `
		<p class="city">${city}<span class="city-delete"></span></p>`;
		UI.GLOBAL.LOCATIONS.insertAdjacentHTML('beforeend', newCity);
	});
}

function deleteCity(e) {
	const currentCity = e.target.parentNode;
	currentCity.remove();
	storage.saveStorage([...favorList].filter(city => city !== currentCity.textContent));
}

function fetchOrDeleteCity() {
	UI.GLOBAL.LOCATIONS.addEventListener('click', e => {
		const cityDeleteSpan = e.target.tagName == 'SPAN';
		if (!cityDeleteSpan) {
			fetchWeather(e.target.textContent);
		} else {
			deleteCity(e);
		}
	});
}
