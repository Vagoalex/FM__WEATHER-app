const UI = {
	INPUT: document.querySelector('.input'),
	SEARCH: document.querySelector('.search'),
	TAB_BTN: document.querySelectorAll('.tab'),
	SCREENS: document.querySelectorAll('.screen'),
	LIKE: document.querySelector('.now_city-like'),
	LOCATIONS: document.querySelector('.locations_cities'),
};

export function switchTabs() {
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
}
