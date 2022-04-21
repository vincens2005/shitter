window.addEventListener("DOMContentLoaded", () => {
	if (user.is) {
		location = "home.html";
	}
	wiatal("#tagline", {
		strings: [
			"The best place for your mental diarrhea",
			"Censorship is shit, just like your opinions",
			"Decentralized, like a sewer",
			"Blogging the size of my penis: micro",
			"The shittiest site on the web",
			"Post your shitty life hacks here",
			"Cancel culture just got ten times better"
		],
		typeSpeed: 85,
		backSpeed: 45,
		backDelay: 780,
		loopDelay: 12000
	});
});
