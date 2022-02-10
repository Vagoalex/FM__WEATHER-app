import { UI } from '../view/UI.js';

export { showAlertEmptyInput, renderTime, switchTabs, URL };

const URL = {
	WEATHER: 'http://api.openweathermap.org/data/2.5/weather',
	FORECAST: 'http://api.openweathermap.org/data/2.5/forecast',
	API_KEY: '0a2d47739719cf635e851d4466971dd4',
};

function renderTime(par) {
	let date = new Date(par * 1000);
	let timestr = `${date.getHours()}:${date.getMinutes()}`;
	return timestr;
}

function showAlertEmptyInput(element) {
	element.classList.add('errorEmptyInput');
	setTimeout(() => {
		element.classList.remove('errorEmptyInput');
	}, 250);
}

function switchTabs() {
	UI.GLOBAL.TAB_BTN.forEach(item => {
		item.addEventListener('click', () => {
			let currentTab = item;
			let tabID = currentTab.getAttribute('data-tab');
			let currentScreen = document.querySelector(tabID);

			if (!currentTab.classList.contains('tab-active')) {
				UI.GLOBAL.TAB_BTN.forEach(elem => {
					elem.classList.remove('tab-active');
				});

				UI.GLOBAL.SCREENS.forEach(elem => {
					elem.classList.remove('active');
				});

				currentTab.classList.add('tab-active');
				currentScreen.classList.add('active');
			}
		});
	});

	document.querySelector('.tab').click();
}
