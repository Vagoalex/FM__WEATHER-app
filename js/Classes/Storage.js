export { Storage, favorList, setCookie };

let favorList = new Set();

class Storage {
	constructor(keyArray, city = undefined, keyCity, newArray) {
		this.keyArray = keyArray;
		this.city = city;
		this.keyCity = keyCity;
		this.newArray = newArray;
	}
	set() {
		favorList.add(this.city);
		localStorage.setItem(this.keyArray, JSON.stringify([...favorList]));
	}
	get() {
		return JSON.parse(localStorage.getItem(this.keyArray)) || [];
	}
	saveCity() {
		localStorage.setItem(this.keyCity, JSON.stringify(this.city));
	}
	saveStorage() {
		localStorage.setItem(this.keyArray, JSON.stringify(this.newArray));
	}
}

function setCookie(data) {
	const stringData = JSON.stringify(data);
	return (document.cookie = `cityData=${stringData}; max-age=9`);
}
