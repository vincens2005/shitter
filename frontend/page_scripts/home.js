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
		text: shit_text
	};
	
	let signed_data = await SEA.sign(shit_data, user.pair())
	
	let shit = gun.get("shit/" + uniqueid).put({signed_data});
	
	shit.get("author").put(user).get("shits").set(shit);
	
	gun.get("shitter_shits").set(shit);
	
	document.querySelector("#shit-text").value = "";
	randomize_placeholder();
}

function init() {
	if (!user.is) {
		document.querySelector("#shitform").classList.add("hidden");
		document.querySelector("#loginthing").classList.remove("hidden");
	}
	randomize_placeholder();
}

window.addEventListener("DOMContentLoaded", init);
