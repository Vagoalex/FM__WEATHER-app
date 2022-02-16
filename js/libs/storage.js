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
export { storage, favorList, setCookie };
let favorList = new Set();
const storage = {
	setStorage(city) {
		favorList.add(city);
		localStorage.setItem('favorCities', JSON.stringify([...favorList]));
	},
	getStorage() {
		return JSON.parse(localStorage.getItem('favorCities')) || [];
	},
	saveFavorCity(data) {
		localStorage.setItem('favoriteCity', JSON.stringify(data));
	},
	saveStorage(array) {
		localStorage.setItem('favorCities', JSON.stringify([...array]));
	},
};

function setCookie(data) {
	const stringData = JSON.stringify(data);
	return (document.cookie = `cityData=${stringData}; max-age=9`);
}
