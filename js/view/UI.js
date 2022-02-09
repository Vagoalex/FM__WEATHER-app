export { UI, URL, NOW, DETAILS };

const URL = {
	WEATHER: 'http://api.openweathermap.org/data/2.5/weather',
	FORECAST: 'http://api.openweathermap.org/data/2.5/forecast',
	API_KEY: '0a2d47739719cf635e851d4466971dd4',
};

const UI = {
	INPUT: document.querySelector('.input'),
	SEARCH: document.querySelector('.search'),
	TAB_BTN: document.querySelectorAll('.tab'),
	SCREENS: document.querySelectorAll('.screen'),
	LIKE: document.querySelector('.now_city-like'),
	LOCATIONS: document.querySelector('.locations_cities'),
	FORM: document.querySelector('.form'),
};

const NOW = {
	TEMP: document.querySelector('.now_gradus'),
	IMG: document.querySelector('.now_img'),
	NAME: document.querySelector('.now_city-show'),
};

const DETAILS = {
	TEMP: document.querySelector('.temperValue'),
	FEELS_LIKE: document.querySelector('.feelsValue'),
	NAME: document.querySelector('.details_name'),
	WEATHER: document.querySelector('.weatherValue'),
	SUNRISE: document.querySelector('.sunriseValue'),
	SUNSET: document.querySelector('.sunsetValue'),
};
