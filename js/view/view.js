export { showAlertEmptyInput };

function showAlertEmptyInput(element) {
	element.classList.add('errorEmptyInput');
	setTimeout(() => {
		element.classList.remove('errorEmptyInput');
	}, 250);
}
