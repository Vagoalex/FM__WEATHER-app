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
	setStorage(array) {
		localStorage.setItem('favorCities', JSON.stringify(array));
	},
	getStorage() {
		return JSON.parse(localStorage.getItem('favorCities')) || [];
	},
};
