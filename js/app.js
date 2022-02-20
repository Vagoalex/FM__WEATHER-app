import { UI } from './view/UI.js';
import { showAlertEmptyInput, switchTabs } from './libs/helpers.js';
import { Storage, favorList } from './Classes/Storage.js';
import { fetchWeather } from './libs/fetchWeather.js';
import { addFavorites, displayCity, fetchFavorWeather } from './view/view.js';

function startApp() {
	const storage = new Storage('favorCities');
	storage.get().forEach(city => favorList.add(city));
	switchTabs();
	displayCity();
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
UI.GLOBAL.LOCATIONS.addEventListener('click', e => {
	fetchFavorWeather(e);
});
UI.GLOBAL.LIKE.addEventListener('click', addFavorites);
