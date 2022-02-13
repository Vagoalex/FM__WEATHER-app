import { UI } from './view/UI.js';
import { showAlertEmptyInput, renderTime, switchTabs, URL } from './libs/helpers.js';
import { storage, favorList } from './libs/storage.js';
import { fetchWeather, renderWeather } from './libs/fetchWeather.js';
import { addFavorites, displayCity, fetchOrDeleteCity } from './view/view.js';

function startApp() {
	switchTabs();
	storage.getStorage().forEach(city => favorList.add(city));
	displayCity();
	fetchOrDeleteCity();
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
});
