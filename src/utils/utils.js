export function AddCommaDelimiter(str) {
	str = str + "";
	const numberRegex = /(\d)(?=(\d{3})+(?!\d))/g;
	return str.replace(numberRegex, "$1,");
}
