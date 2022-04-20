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

async function get_user_info(id) {
	let user = gun.user(id);
	let username = await user.get("name").then();
	let user_profile = await user.get("profile_info").then();
	let default_info = {
		profile_pic: "images/pfp.jpg",
		username,
		display_name: username,
		bio: ""
	}
	
	if (!user_profile) return default_info;
	
	let info = {};
	
	for (let i in default_info) {
		info[i] = user_profile[i] || default_info[i];
	}
	return info;
}
