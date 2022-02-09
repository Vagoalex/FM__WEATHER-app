export function renderDate(par) {
	let date = new Date(par * 1000);
	let timestr = `${date.getHours()}:${date.getMinutes()}`;
	return timestr;
}
