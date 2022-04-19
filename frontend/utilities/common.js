/* self explanatory
	* @param {Number} min - the minimum number
	* @param {Number} max - the maximum number
*/
function randint(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function randarr(array) {
	return array[randint(0, array.length)];
}
