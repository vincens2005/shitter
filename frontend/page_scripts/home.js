json = JSON;
function randomize_placeholder() {
	document.querySelector("#shit-text").setAttribute("placeholder", randarr([
		"What's poopin'?",
		"Scream into the void",
		"Take your dump",
		"Who's bad?",
		"Cancel someone",
		"Make JK Rowling proud",
		"Put your bad takes here",
		"Empty your bowels",
		"What's in your ass?",
		"Show the world how based you are"
	]));
}

async function shit() {
	// TODO: actual shitting
	let shit_text = document.querySelector("#shit-text").value;
	if (!shit_text || !user.is) return;
	
	let uniqueid = Math.floor(Math.random() * Date.now())
	let shit_data = {
		embedimg: null, // TODO: embedding
		embedvideo: null,
		embedurl: null,
		text: shit_text.slice(0, 28000),
		uniqueid
	};
	
	let signed_data = await SEA.sign(shit_data, user.pair())
	
	let shit = gun.get("shit/" + uniqueid).put({signed_data});
	
	shit.get("author").put(user).get("shitsv" + shitter_version).set(shit);
	
	gun.get(shits_db).set(shit);
	
	document.querySelector("#shit-text").value = "";
	randomize_placeholder();
}

async function init() {
	if (!user.is) {
		document.querySelector("#shitform").classList.add("hidden");
		document.querySelector("#loginthing").classList.remove("hidden");
	}
	randomize_placeholder();
	
	await prefetchtemplates(["templates/shits.hbs"]);
	
	let shits = document.querySelector("#shits");
	let shit_ids = [];
	await gun.get(shits_db).map({
		".": {
			">": {
				signed_data: Date.now()
			}
		},
		"-": 1
	}).on(async shit => {
		if (!shit) return;
		console.log(shit)
		shit = await get_shit_data(shit);
		if (!shit || shit_ids.includes(shit.uniqueid)) return;
		shit.text = shit.text.length > 200 ? shit.text.slice(0, 200) + "..." : shit.text;
		handlebardata = {shits: [shit]};
		let shit_el = await fill_template("templates/shits.hbs", handlebardata);
		if (!shit_el) return;
		
		shits.prepend(shit_el);
		shit_ids.push(shit.uniqueid);
	}).then();
}

window.addEventListener("DOMContentLoaded", init);
