const UI = {
	INPUT: document.querySelector('.input'),
	SEARCH: document.querySelector('.search'),
	TAB_BTN: document.querySelectorAll('.tab'),
	SCREENS: document.querySelectorAll('.screen'),
	LIKE: document.querySelector('.now_city-like'),
	LOCATIONS: document.querySelector('.locations_cityes'),
};
const NOW = {
	TEMP: document.querySelector('.now_gradus'),
	IMG: document.querySelector('.now_img'),
	NAME: document.querySelector('.now_city-show'),
};
const ALERT = {
	NOT_FOUND_MESSAGE: document.querySelector('.alert-city--disabled'),
};
const DETAILS = {
	TEMP: document.querySelector('.temperValue'),
	FEELS_LIKE: document.querySelector('.feelsValue'),
	NAME: document.querySelector('.details_name'),
	WEATHER: document.querySelector('.weatherValue'),
	SUNRISE: document.querySelector('.sunriseValue'),
	SUNSET: document.querySelector('.sunsetValue'),
};

const URL = {
	WEATHER: 'http://api.openweathermap.org/data/2.5/weather',
	FORECAST: 'http://api.openweathermap.org/data/2.5/forecast',
	API_KEY: '0a2d47739719cf635e851d4466971dd4',
};

UI.SEARCH.addEventListener('click', event => {
	event.preventDefault();
	const emptyInput = UI.INPUT.value == '';
	if (emptyInput) {
		showAlertEmptyInput();
		return;
	}
	fetchWeather(UI.INPUT.value);
});

function showAlertEmptyInput() {
	UI.INPUT.classList.add('errorEmptyInput');
	setTimeout(() => {
		UI.INPUT.classList.remove('errorEmptyInput');
	}, 250);
}

async function fetchWeather(cityName) {
	const url = `${URL.WEATHER}?q=${cityName}&appid=${URL.API_KEY}&units=metric`;
	let response = await fetch(url);
	let result = await response.json();
	try {
		// if (!result.name) {
		// 	throw new Error('This city is not found!');
		// }
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
		await alertMessage();
		// alert(error.message);
	} finally {
		UI.INPUT.value = '';
	}
}

async function alertMessage() {
	ALERT.NOT_FOUND_MESSAGE.classList.remove('alert-city--disabled');
	ALERT.NOT_FOUND_MESSAGE.classList.add('alert-city--active');
	await setTimeout(() => {
		ALERT.NOT_FOUND_MESSAGE.classList.remove('alert-city--disabled');
	}, 2000);
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

function getDate(par) {
	let date = new Date(par * 1000);
	let timestr = `${date.getHours()}:${date.getMinutes()}`;
	return timestr;
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
addFavorites();

function renderFavorites() {
	UI.LOCATIONS.innerHTML = '';
	favoriteCities.forEach(item => {
		const addedCity = `
		<p class="city">${item}<span class="city-delete"></span></p>`;
		UI.LOCATIONS.insertAdjacentHTML('beforeend', addedCity);
	});
	localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities));
}

UI.LOCATIONS.addEventListener('click', e => {
	let btnDelete = document.querySelectorAll('.city-delete');
	let spanCity = e.target;
	fetchWeather(spanCity.textContent);
	let getStorage = JSON.parse(localStorage.getItem('favoriteCities'));
	// console.log(spanCity.textContent);
	// let newStorage = getStorage.filter(city => city !== spanCity.textContent);
	// console.log(newStorage);
	localStorage.setItem('favoriteCities', JSON.stringify(getStorage.filter(city => city !== spanCity.parentNode.textContent)));

	btnDelete.forEach(item => {
		if (spanCity !== item) {
			return;
		} else {
			spanCity.parentNode.remove();
		}
	});
});
// switch TABS
UI.TAB_BTN.forEach(item => {
	item.addEventListener('click', () => {
		let currentTab = item;
		let tabID = currentTab.getAttribute('data-tab');
		let currentScreen = document.querySelector(tabID);

		if (!currentTab.classList.contains('tab-active')) {
			UI.TAB_BTN.forEach(elem => {
				elem.classList.remove('tab-active');
			});

			UI.SCREENS.forEach(elem => {
				elem.classList.remove('active');
			});

			currentTab.classList.add('tab-active');
			currentScreen.classList.add('active');
		}
	});
});

document.querySelector('.tab').click();

// window.onclick = elem => {
// 	console.log(elem.target);
// };

// console.log(favoriteCities);
