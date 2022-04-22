function set_embed_type(id) {
	let children = document.querySelector("#shitting-controls").children;
	if (id && document.querySelector("#" + id).classList.contains("current")) return set_embed_type();
	for (let child of children) {
		child.classList.remove("current");
	}
	document.querySelector("#media").classList.add("hidden");
	document.querySelector("#shit-text").focus();
	if (!id) return;
	document.querySelector("#" + id).classList.add("current");
	document.querySelector("#media").classList.remove("hidden");
	document.querySelector("#embed-url").focus();
}

function setup_shit_input(shit_input) {
	shit_input.addEventListener("input", e => {
		if (!shit_input.value) {
			document.querySelector("#shitting-controls").classList.add("hidden");
			document.querySelector("#current-reshit").classList.add("hidden");
			current_reshit = null;
			document.querySelector("#current-reshit").innerHTML = "";
			set_embed_type();
		}
		else {
			document.querySelector("#shitting-controls").classList.remove("hidden");
		}
	});
}
