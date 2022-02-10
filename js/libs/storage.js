// export const storage = {
// 	setStorage(currentCity) {
// 		const favoriteArray = new Set(getStorage());
// 		favoriteArray.add(currentCity);
// 		localStorage.setItem('favorCities', JSON.stringify([...favoriteArray]));
// 	},
// 	getStorage() {
// 		return JSON.parse(localStorage.getItem('favorCities') || '[]');
// 	},
// };

export const storage = {
	favorList: [],
	setStorage(city) {
		if (!this.favorList.includes(city)) {
			this.favorList.push(city);
			localStorage.setItem('favorCities', JSON.stringify(this.favorList));
		} else {
			return;
		}
	},
	getStorage() {
		return JSON.parse(localStorage.getItem('favorCities')) || [];
	},
	saveFavorCity(data) {
		localStorage.setItem('favoriteCity', JSON.stringify(data));
	},
	saveFavorCities() {
		localStorage.setItem('favorCities', JSON.stringify(this.favorList));
	},
	getFavorCity() {
		return JSON.parse(localStorage.getItem('favorCities')) || [];
	},
};
