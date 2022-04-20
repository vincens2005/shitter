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
	document.querySelector("#shit-text").value = "";
	randomize_placeholder();
}

function init() {
	randomize_placeholder();
}

window.addEventListener("DOMContentLoaded", init);
