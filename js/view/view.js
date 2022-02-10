import { UI } from './UI.js';
import { storage } from '../libs/storage.js';
import { fetchWeather, renderWeather } from '../libs/fetchWeather.js';
export { addFavorites, displayCity, deleteCity, fetchSelectedCity };

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
	storage.favorList.forEach(city => {
		const newCity = `
		<p class="city">${city}<span class="city-delete"></span></p>`;
		UI.GLOBAL.LOCATIONS.insertAdjacentHTML('beforeend', newCity);
	});
	storage.getStorage();
}

function deleteCity() {
	const deleteCityBtn = document.querySelectorAll('.city-delete');
	deleteCityBtn.forEach((item, index) => {
		item.addEventListener('click', e => {
			item.parentNode.remove();
			storage.favorList.splice(index, 1);
			storage.saveFavorCities();
		});
	});
}

function fetchSelectedCity() {
	UI.GLOBAL.LOCATIONS.addEventListener('click', e => {
		const cityDelete = e.target.getAttribute('city-delete');
		if (!cityDelete && !null) {
			fetchWeather(e.target.textContent);
		}
	});
}

//TODO: fix deleteCity and fetchSelectedCity. Don't working fetchSelectedCity
