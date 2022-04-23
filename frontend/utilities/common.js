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

async function get_user_info({id, username, i, recursive}) {
	if (!i) i = 1;
	i++;
	recursive = recursive !== undefined ? recursive : true;
	if (!id && username) {
		id = (await gun.get(user_db + "/" + username).then())
		if (!id) return;
		id = id.user["#"].replace("~","");
	}
	
	let user = gun.user(id);
	if (!username) username = await user.get("name").then();
	let user_profile = await user.get("profile_info").then();
	let default_info = {
		profile_pic: "images/pfp.jpg",
		username,
		display_name: username,
		bio: ""
	}
	
	if (!user_profile) {
		if (i > 20 || !recursive) return default_info;
		return await get_user_info({id, i});
	}
	
	
	let info = {};
	
	for (let i in default_info) {
		info[i] = user_profile[i] || default_info[i];
	}

	return info;
}

async function get_shit_data(shit_id, recursive, large, i) {
	if (!i) i = 1;
	i++;
	if (i > 20) return null; // kill after 20 tries
	let shit = await gun.get(shit_id).then();
	if (!shit) return await get_shit_data(shit_id, recursive, large, i);
	
	recursive = recursive !== undefined ? recursive : true;
	
	let id = shit.author["#"].replace("~",""); // so we don't have to clear the database
	let shit_data = await SEA.verify(shit.signed_data, id);

	if (!shit_data) return await get_shit_data(shit_id, recursive, large, i);
	
	shit_data.uniqueid = String(shit_data.uniqueid);
	shit_data.text = htmltotext(shit_data.text);
	shit_data.short_text = (shit_data.text.length > 200 ? shit_data.text.slice(0, 200) + "..." : shit_data.text).autoLink({target: "_blank"});
	shit_data.text = shit_data.text.autoLink({target: "_blank"});
	shit_data.large = large;
	
	let user_info = await get_user_info({id});
	
	if (!user_info) return null;
	
	if (shit_data.reshitting && recursive) shit_data.quote_shit = await get_shit_data("shit/" + shit_data.reshitting, true, large);
		
	return {...shit_data, ...user_info};
}

async function create_shit({embedimg, embedvideo, embedurl, reshitting, replying, text}) {
	let uniqueid = Math.floor(Math.random() * Date.now());
	
	let shit_data = {embedimg, embedvideo, embedurl, reshitting, replying, text, uniqueid};
	
	let signed_data = await SEA.sign(shit_data, user.pair())
	
	let shit = gun.get("shit/" + uniqueid).put({signed_data});
	
	shit.get("author").put(user).get("shitsv" + shitter_version).set(shit);
	shit.get("authorname").put(await user.get("name").then());
		
	if (replying) {
		let reply_to = gun.get("shit/" + replying);
		reply_to.get("replies").set(shit);
		return;
	}
	gun.get(shits_db).set(shit);	
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


/** removes html from text
	* @param {String} html - the html to clean
*/
function htmltotext(html) {
	let el = document.createElement("span");
	el.innerHTML = html;
	text = el.innerText;
	text = text.replace(/</g, "&lt;");
	text = text.replace(/>/g, "&gt;");
	return text;
}

window.addEventListener("DOMContentLoaded", () => {
	Handlebars.registerHelper("def", options => {
		Handlebars.registerPartial(options.hash.name, options.fn());
		return;
	});
});

async function init_header() {
	document.querySelector("#navigation").innerHTML = "";
	await fill_template("templates/nav.hbs", {
		links: [
			{
				url: "home.html",
				title: "home"
			}
		]
	}, "#navigation");
}
