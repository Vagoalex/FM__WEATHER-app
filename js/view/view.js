import { UI } from './UI.js';
import { Storage, favorList } from '../Classes/Storage.js';
import { fetchWeather, renderWeather } from '../libs/fetchWeather.js';
export { addFavorites, displayCity, deleteCity };

function addFavorites() {
	const currentCity = UI.NOW.NAME.textContent;
	const isEmptyInput = currentCity == 'Name of city';
	if (isEmptyInput) {
		alert('This city is not valid!');
	} else {
		const storage = new Storage('favorCities', currentCity);
		storage.set(currentCity);
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
	// const newStorage = [...favorList].filter(city => city !== currentCity.textContent);
	const newStorage = [...favorList].filter(city => {
		if (city !== currentCity.textContent) {
			return city;
		}
	});
	const storage = new Storage('favorCities', currentCity, 'favoriteCity', newStorage);
	storage.saveStorage();
	currentCity.remove();
}
