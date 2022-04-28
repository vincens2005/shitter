let username;
let profile;

async function init() {
	init_header();
	await prefetchtemplates(["templates/shits.hbs"]);
	
	let url = new URL(location);
	username = url.searchParams.get("user");
	username = decodeURIComponent(username || "");
	
	let id;
	
	if (!username) id = user.is && user.is.pub;
	
	console.log(id)
	
	if(!id) return noprofile();
	
	profile = await get_user_info({id, username, retry: true});
	console.log(profile)
	
	if (!profile) {
		console.log("no profile????");
		return noprofile();
	}
	document.title = `@${profile.username} - Shitter`;
	document.querySelector("#profile").innerHTML = "";
	fill_template("templates/profile.hbs", profile, "#profile");
}

function noprofile() {
	document.querySelector("#profile").innerHTML = "<article>profile not found</article>";
}

window.addEventListener("DOMContentLoaded", init);
