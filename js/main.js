import { UI } from './UI_elements/UI.js';
import { NOW } from './UI_elements/NOW.js';
import { DETAILS } from './UI_elements/DETAILS.js';
import { showAlertEmptyInput } from './libs/showAlertEmptyInput.js';
import { getDate } from './libs/getDate.js';
// switch TABS
import { switchTabs } from './libs/switchTabs.js';
switchTabs();

const URL = {
	WEATHER: 'http://api.openweathermap.org/data/2.5/weather',
	FORECAST: 'http://api.openweathermap.org/data/2.5/forecast',
	API_KEY: '0a2d47739719cf635e851d4466971dd4',
};

// const ALERT = {
// 	NOT_FOUND_MESSAGE: document.querySelector('.alert-city--disabled'),
// };
// async function alertMessage() {
// 	ALERT.NOT_FOUND_MESSAGE.classList.remove('alert-city--disabled');
// 	ALERT.NOT_FOUND_MESSAGE.classList.add('alert-city--active');
// 	await setTimeout(() => {
// 		ALERT.NOT_FOUND_MESSAGE.classList.remove('alert-city--disabled');
// 	}, 2000);
// }

UI.SEARCH.addEventListener('click', event => {
	event.preventDefault();
	const emptyInput = UI.INPUT.value == '';
	if (emptyInput) {
		showAlertEmptyInput(UI.INPUT);
		return;
	}
	fetchWeather(UI.INPUT.value);
});

async function fetchWeather(cityName) {
	const url = `${URL.WEATHER}?q=${cityName}&appid=${URL.API_KEY}&units=metric`;
	let response = await fetch(url);
	let result = await response.json();
	try {
		if (!result.name) {
			throw new Error('This city is not found!');
		}
		console.log(result);
		let data = {
			name: result.name,
			temp: result.main.temp,
			icon: result.weather[0].icon,
			feels_like: result.main.feels_like,
			weather: result.weather[0]['description'],
			sunrise: result.sys.sunrise,
			sunset: result.sys.sunset,
		};
		renderWeather(data);
	} catch (error) {
		alert(error.message);
	} finally {
		UI.INPUT.value = '';
	}
}

function renderWeather(data) {
	NOW.NAME.textContent = data.name;
	NOW.TEMP.textContent = Math.round(data.temp);
	NOW.IMG.style.backgroundImage = `url(http://openweathermap.org/img/wn/${data.icon}@4x.png)`;

	DETAILS.NAME.textContent = data.name;
	DETAILS.TEMP.textContent = Math.round(data.temp);
	DETAILS.FEELS_LIKE.textContent = Math.round(data.feels_like);
	DETAILS.WEATHER.textContent = data.weather;
	DETAILS.SUNRISE.textContent = data.sunrise;
	DETAILS.SUNSET.textContent = data.sunset;
	const sunrise = data.sunrise;
	const sunset = data.sunset;
	DETAILS.SUNRISE.textContent = getDate(sunrise);
	DETAILS.SUNSET.textContent = getDate(sunset);
}

let favoriteCities = [];
if (localStorage.getItem('favoriteCities') != undefined) {
	favoriteCities = JSON.parse(localStorage.getItem('favoriteCities'));
	renderFavorites();
}

function addFavorites() {
	UI.LIKE.addEventListener('click', () => {
		const currentCity = NOW.NAME.textContent;
		const favoriteIncludeCity = favoriteCities.includes(currentCity);
		const emptyInput = currentCity == '' || currentCity == 'Name of city';

		if (favoriteIncludeCity) {
			alert('This city already exists in favorites!');
		} else if (emptyInput) {
			alert('This city is not valid!');
		} else {
			favoriteCities.push(currentCity);
		}
		renderFavorites();
	});
}
function renderFavorites() {
	UI.LOCATIONS.innerHTML = '';
	favoriteCities.forEach(item => {
		const addedCity = `
		<p class="city">${item}<span class="city-delete"></span></p>`;
		UI.LOCATIONS.insertAdjacentHTML('beforeend', addedCity);
	});
	localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities));
}
addFavorites();

UI.LOCATIONS.addEventListener('click', e => {
	let btnDelete = document.querySelectorAll('.city-delete');
	let spanCity = e.target;

	let getStorage = JSON.parse(localStorage.getItem('favoriteCities'));
	// console.log(UI.LOCATIONS.children);

	btnDelete.forEach(item => {
		if (spanCity !== item) {
			return;
		} else {
			spanCity.parentNode.remove();
		}
	});

	localStorage.setItem('favoriteCities', JSON.stringify(getStorage.filter(city => city !== spanCity.parentNode.textContent)));
});
// console.log(UI.LOCATIONS);
function fetchFavorits() {
	UI.LOCATIONS.addEventListener('click', e => {
		let spanCity = e.target;
		if (spanCity == spanCity.parentElement) {
			fetchWeather(spanCity.textContent);
		}
	});
}
fetchFavorits();
// function fetchFavorites(params) {
// 	UI.LOCATIONS.addEventListener('click', e => {
// 		let spanCity = e.target;
// 		console.log(spanCity.lastElementChild);
// 	});
// }
// fetchFavorites();
