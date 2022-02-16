import { UI } from '../view/UI.js';
import { renderTime, URL } from './helpers.js';
import { storage, setCookie } from './storage.js';

export async function fetchWeather(cityName) {
	const url = `${URL.WEATHER}?q=${cityName}&appid=${URL.API_KEY}&units=metric`;
	let response = await fetch(url);
	let result = await response.json();
	try {
		if (result.cod == '404') {
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
		storage.saveFavorCity(data);
		setCookie(data);
	} catch (error) {
		alert(error.message);
	} finally {
		UI.GLOBAL.FORM.reset();
	}
}

export function renderWeather(data) {
	UI.NOW.NAME.textContent = data.name;
	UI.NOW.TEMP.textContent = Math.round(data.temp);
	UI.NOW.IMG.style.backgroundImage = `url(http://openweathermap.org/img/wn/${data.icon}@4x.png)`;

	UI.DETAILS.NAME.textContent = data.name;
	UI.DETAILS.TEMP.textContent = Math.round(data.temp);
	UI.DETAILS.FEELS_LIKE.textContent = Math.round(data.feels_like);
	UI.DETAILS.WEATHER.textContent = data.weather;
	UI.DETAILS.SUNRISE.textContent = data.sunrise;
	UI.DETAILS.SUNSET.textContent = data.sunset;
	const sunrise = data.sunrise;
	const sunset = data.sunset;
	UI.DETAILS.SUNRISE.textContent = renderTime(sunrise);
	UI.DETAILS.SUNSET.textContent = renderTime(sunset);
}
