import { UI } from './view/UI.js';
import { showAlertEmptyInput, renderTime, switchTabs, URL } from './libs/helpers.js';
import { Storage, favorList } from './Classes/Storage.js';
import { fetchWeather, renderWeather } from './libs/fetchWeather.js';
import { addFavorites, displayCity, deleteCity } from './view/view.js';

const storage = new Storage('favorCities');
storage.get().forEach(city => favorList.add(city));
function startApp() {
	switchTabs();
	displayCity();
}

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
UI.GLOBAL.LOCATIONS.addEventListener('click', e => {
	const cityDeleteSpan = e.target.tagName == 'SPAN';
	const cityLocations = e.target.tagName == 'DIV';
	if (!cityDeleteSpan && !cityLocations) {
		fetchWeather(e.target.textContent);
	} else if (cityDeleteSpan) {
		deleteCity(e);
	} else if (cityLocations) {
		return;
	}
});
UI.GLOBAL.LIKE.addEventListener('click', e => {
	addFavorites();
});
startApp();
