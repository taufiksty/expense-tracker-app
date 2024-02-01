const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

export function getFormattedDate(date: Date): string {
	return `${DAYS[date.getDay()]}, ${date.getDate()} ${
		MONTHS[date.getMonth()]
	} ${date.getFullYear()}`;
}

export function getDateWeekBefore(): Date {
	const date = new Date();
	return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
}
