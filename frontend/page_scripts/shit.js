let reply_ids = [];
let working = false;
let shit_id;
async function init() {
	let shit_input = document.querySelector("#shit-text");
	setup_shit_input(shit_input);
	init_header();
	await prefetchtemplates(["templates/shits.hbs"]);
	
	let url = new URL(location);
	shit_id = url.searchParams.get("shit");
	
	if (!shit_id) {
		console.log("no shit, sherlock")
		return noshit();
	}
	
	let shit_data = await get_shit_data("shit/" + shit_id, true, true);
	
	if (!shit_data || !shit_data.username) return noshit();
		
	
	
	document.querySelector("#main-shit").innerHTML = "";
	fill_template("templates/shits.hbs", {shits: [shit_data]}, "#main-shit");
	
	document.title = `Shit by ${shit_data.username} - Shitter`;
	
	gun.get("shit/" + shit_id).get("replies").map().on(async shit => {
		if (!shit) return;
		console.log(shit)
		shit = await get_shit_data(shit._["#"]);
		handlebardata = {shits: [shit]};
		let shit_el = await fill_template("templates/shits.hbs", handlebardata);
		if (!shit_el) return;
		
		if (reply_ids.includes(shit.uniqueid)) {
			document.querySelector("#shit-" + shit.uniqueid).outerHTML = shit_el.outerHTML;
			return;
		}
		
		document.querySelector("#replies").prepend(shit_el);
		document.querySelector("#reply_cont").classList.remove("hidden");
		reply_ids.push(shit.uniqueid);
	});
	
	if (user.is) document.querySelector("#shitbox").classList.remove("hidden");
}

function noshit() {
	fill_template("templates/shits.hbs", {
			shits: [
				{
					uniqueid: "none",
					text: "Shit not found :(",
					large: true
				}
			]
	  }, "#main-shit");
}

function reshit(id) {
	location = "home.html?reshit=" + id;
}

async function reply() {
	let shit_text = document.querySelector("#shit-text").value;
	if (!shit_text || !user.is || working) return;
	working = true;
	document.querySelector("#shitbutton").classList.toggle("secondary");
	
	let shit_data = {
		embedimg: null,
		embedvideo: null,
		embedurl: document.querySelector("#embed-url").value || null,
		text: shit_text.slice(0, 28000),
		replying: shit_id
	};
	
	if (document.querySelector(".shit_control.current")) {
		shit_data[document.querySelector(".shit_control.current").id] = true; // god this is cursed
	}
	
	await create_shit(shit_data);
	
	// reset stuff
	document.querySelector("#shit-text").value = "";
	document.querySelector("#embed-url").value = "";
	set_embed_type();
	document.querySelector("#shitting-controls").classList.add("hidden");
	
	setTimeout(() => {
		working = false;
		document.querySelector("#shitbutton").classList.toggle("secondary");
	}, 2000);
}

window.addEventListener("DOMContentLoaded", init);
