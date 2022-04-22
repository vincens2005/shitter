let working = false;
let current_reshit = null;
let shit_ids = [];
let re_init = false;

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
	let shit_text = document.querySelector("#shit-text").value;
	if ((!shit_text && !current_reshit) || !user.is || working) return;
	working = true;
	document.querySelector("#shitbutton").classList.toggle("secondary");
	
	let shit_data = {
		embedimg: null,
		embedvideo: null,
		embedurl: document.querySelector("#embed-url").value || null,
		text: shit_text.slice(0, 28000),
	};
	
	 if (document.querySelector(".shit_control.current")) {
		shit_data[document.querySelector(".shit_control.current").id] = true; // god this is cursed
	 }
	 
	 if (current_reshit) shit_data.reshitting = current_reshit;
	
	await create_shit(shit_data);
	
	// reset stuff
	document.querySelector("#shit-text").value = "";
	document.querySelector("#embed-url").value = "";
	set_embed_type();
	current_reshit = null;
	document.querySelector("#shitting-controls").classList.add("hidden");
	
	randomize_placeholder();
	setTimeout(() => {
		working = false;
		document.querySelector("#shitbutton").classList.toggle("secondary");
	}, 2000);
}

async function init() {
	if (!user.is) {
		document.querySelector("#shitform").classList.add("hidden");
		document.querySelector("#loginthing").classList.remove("hidden");
	}
	randomize_placeholder();
	
	if (!re_init) await prefetchtemplates(["templates/shits.hbs"]);

	let shits = document.querySelector("#shits");
	
	shits.innerHTML = "";
	shit_ids = [];
	
	gun.get(shits_db).map()[re_init ? "on" : "once"/* this is one of the dumbest things I've ever done*/](async shit => {
		if (!shit) return;
		console.log(shit)
		shit = await get_shit_data(shit._["#"]); // the id of the shit
		if (!shit) return;
		
		handlebardata = {shits: [shit]};
		let shit_el = await fill_template("templates/shits.hbs", handlebardata);
		if (!shit_el) return;
		
		if (shit_ids.includes(shit.uniqueid)) {
			document.querySelector("#shit-" + shit.uniqueid).outerHTML = shit_el.outerHTML;
			return;
		}
		
		shits.prepend(shit_el);
		shit_ids.push(shit.uniqueid);
		
		if (!re_init) {
			re_init = true;
			init(); // god this is stupid
		}
	});
	
	if (re_init) { // run this the second time
		// check for reshit in URL query string
		let url = new URL(location);
		let reshit_id = url.searchParams.get("reshit");
		if (reshit_id) {
			setTimeout(async () => {
				await reshit(reshit_id);
				url.searchParams.delete("reshit");
				history.pushState({}, "", url);
			}, 500)
		}
		
		if (user.is) {
			let user_data = await get_user_info({id: user.is.pub});
			let pfp = document.createElement("IMG");
			pfp.classList.add("pfp");
			pfp.src = user_data.profile_pic;
			document.querySelector("#shitform_grid").prepend(pfp);
		}
		return;
	}
	
	let shit_input = document.querySelector("#shit-text");
	setup_shit_input(shit_input);
	init_header();
}

async function reshit(id) {
	current_reshit = id;
	document.querySelector("#shitting-controls").classList.remove("hidden");
	document.querySelector("#current-reshit").classList.remove("hidden");
	let shit = await get_shit_data("shit/" + id, false);
	
	if (!shit) {
		document.querySelector("#current-reshit").classList.add("hidden");
		current_reshit = null;
		document.querySelector("#current-reshit").innerHTML = "";
		return set_embed_type();
	} 
	
	console.log(shit)
	document.querySelector("#current-reshit").innerHTML = "Reshitting: " + (shit.text.length > 30 ? shit.text.slice(0, 30) + "..." : shit.text);
	document.querySelector("#shit-text").setAttribute("placeholder", "Reshit text (can be blank)");
	document.querySelector("#shit-text").focus();
}

window.addEventListener("DOMContentLoaded", init);
