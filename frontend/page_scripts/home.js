function randomize_placeholder() {
	document.querySelector("#shit-text").setAttribute("placeholder", randarr([
		"What's poppin'?",
		"Scream into the void",
		"Take your dump",
		"Who's bad?",
		"Cancel someone",
		"Make me proud",
		"SPEW",
		"Empty your bowels"
	]));
}

async function shit() {
	// TODO: actual shitting
	document.querySelector("#shit-text").value = "";
	randomize_placeholder();
}

function init() {
	randomize_placeholder();
}

window.addEventListener("DOMContentLoaded", init);
