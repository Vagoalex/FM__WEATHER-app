import { UI, URL, NOW, DETAILS } from './view/UI.js';
import { showAlertEmptyInput } from './view/view.js';
import { renderDate } from './libs/renderDate.js';
// switch TABS
import { switchTabs } from './libs/switchTabs.js';
// storage
import { storage } from './libs/storage.js';
switchTabs();

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
		if (!result.statusText !== 'OK') {
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
		UI.FORM.reset();
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
	DETAILS.SUNRISE.textContent = renderDate(sunrise);
	DETAILS.SUNSET.textContent = renderDate(sunset);
}

// if (localStorage.getItem('favoriteCities') != undefined) {
// 	favoriteCities = JSON.parse(localStorage.getItem('favoriteCities'));
// 	renderFavorites();
// }
let favorList = storage.getStorage();

// storage.getStorage(favorList);

UI.LIKE.addEventListener('click', addFavorites);
function addFavorites() {
	const currentCity = NOW.NAME.textContent;
	const isEmptyInput = currentCity == '' || currentCity == 'Name of city';
	if (isEmptyInput) {
		alert('This city is not valid!');
	} else {
		// UI.LOCATIONS.innerHTML += createTemplate(currentCity);
		favorList.push(currentCity);
		// storage.setStorage(favorList);
		displayCity(UI.LOCATIONS, favorList);

		// UI.LOCATIONS.innerHTML += createTemplate(currentCity);
	}

	function displayCity(cityList, favorArray) {
		cityList.innerHTML = '';
		cityList.innerHTML = favorArray
			.map(city => {
				return `<p class="city">${city}<span class="city-delete"></span></p>`;
			})
			.join('');
		storage.setStorage(favorList);
		// return `<p class="city">${city}<span class="city-delete"></span></p>`;
	}

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
}

// function renderFavoriteCities(city) {
// 	// for (let item of UI.LOCATIONS.children) {
// 	// 	if (item === city) {
// 	//
// 	// 	} else {
// 	// 		return;
// 	// 	}
// 	// }
// }

function renderFavorites() {
	UI.LOCATIONS.innerHTML = '';
	favorList.forEach(item => {
		const addedCity = `;
		<p class="city">${item}<span class="city-delete"></span></p>`;
		UI.LOCATIONS.insertAdjacentHTML('beforeend', addedCity);
	});
	localStorage.setItem('favoriteCities', JSON.stringify([...favoriteCities]));
}

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
displayCity(UI.LOCATIONS, favorList);
