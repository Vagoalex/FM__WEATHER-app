import { UI } from './UI.js';
import { Storage, favorList } from '../Classes/Storage.js';
import { fetchWeather, renderWeather } from '../libs/fetchWeather.js';
export { addFavorites, displayCity, deleteCity, fetchFavorWeather };

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
	const storage = new Storage('favorCities');
	storage.get().forEach(city => {
		const newCity = `
		<p class="city">${city}<span class="city-delete"></span></p>`;
		UI.GLOBAL.LOCATIONS.insertAdjacentHTML('beforeend', newCity);
	});
	deleteCity();
}

function deleteCity() {
	const removeCityBtn = document.querySelectorAll('.city-delete');
	removeCityBtn.forEach(city => {
		city.addEventListener('click', () => {
			city.parentNode.remove();

			const locationsCities = document.querySelectorAll('.city');
			const newFavorCities = [...locationsCities].map(city => city.textContent);

			const storage = new Storage('favorCities', undefined, 'favoriteCity', newFavorCities);

			storage.saveStorage();
		});
	});
}

function fetchFavorWeather(e) {
	const cityDeleteSpan = e.target.tagName == 'SPAN';
	const cityLocations = e.target.tagName == 'DIV';
	if (!cityDeleteSpan && !cityLocations) {
		fetchWeather(e.target.textContent);
	} else if (cityDeleteSpan) {
		return;
	}
}
