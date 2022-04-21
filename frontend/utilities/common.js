let gotten_users = {};
let templates = {}; // this caches the templates so they don't need to be fetched

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

async function get_user_info({id, username}) {
	if (gotten_users[id || username]) return gotten_users[id || username];
	if (!id && username) {
		id = (await gun.get(user_db + "/" + username).then()).user["#"].replace("~","");
	}
	if (gotten_users[id]) return gotten_users[id];
	
	let user = gun.user(id);
	if (!username) username = await user.get("name").then();
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
	gotten_users[id] = info;
	return info;
}

async function get_shit_data(shit) {
	if (!shit) return null;
	
	let id = shit.author["#"].replace("~","");
	let shit_data = await SEA.verify(shit.signed_data, id);
	
	if (!shit_data) return null;
	
	let user_info = await get_user_info({id});
		
	return {...shit_data, ...user_info};
}

/** automatically fills out handlebars template
 * @param {String} template_url - the url to the handlebars template to use
 * @param {Object} data - the data to fill.
 * @param {String} target_selector - the selector of the element to put the final HTML. if null then the html is returned
 * @param {Object} handlebar_options - extra handlebars config
 */
async function fill_template(template_url, data, target_selector, handlebar_options) {
	if (typeof data != "object") {
		return;
	}
	if (!handlebar_options) {
		handlebar_options = {};
	}
	let template_string = templates[template_url];
	if (!template_string) {
		template_string = await fetch(template_url).then(a => a.text());
		templates[template_url] = template_string;
	}
	
	let template = Handlebars.compile(template_string, handlebar_options);
	let html = template(data);
	if (!target_selector) {
		let parser = new DOMParser();
		return parser.parseFromString(html, "text/html").body.firstChild;
	}
	document.querySelector(target_selector).innerHTML += html;
}

/** prefetches templates
	* @param {Object} urls - and array of URLs to prefetch
*/
function prefetchtemplates(urls) {
	return new Promise((resolve, reject) => {
		for (let i in urls) {
			fetch(urls[i]).then(a => a.text()).then(a => {
				templates[urls[i]] = a
				if (i == urls.length - 1) resolve();
			});
		}
	});
}
