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
	
	if(!id && !username) return noprofile();
	
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

async function editprofile() {
	if (!profile.is_me) return;
	let edit_el = await fill_template("templates/edit_profile.hbs", profile);
	document.querySelector("#profile").innerHTML = "";
	document.querySelector("#profile").appendChild(edit_el);
	
	document.querySelector("#pfp_input").addEventListener("input", e => {
		document.querySelector("#pfp").src = e.target.value || "images/pfp.jpg";
	});
}

async function save_profile() {
	if (!user.is) return;
	await user.get("profile_info").put({
		profile_pic: document.querySelector("#pfp_input").value || "images/pfp.jpg",
		display_name: document.querySelector("#display_name").value || profile.username,
		bio: document.querySelector("#bio").value || profile.username,
	}).then();
	init();
}

window.addEventListener("DOMContentLoaded", init);
