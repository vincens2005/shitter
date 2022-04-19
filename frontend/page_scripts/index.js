window.addEventListener("DOMContentLoaded", () => {
	if (user.is) {
		location = "home.html";
	}
	wiatal("#tagline", {
		strings: [
			"The best place for your mental diarrhea",
			"Censorship is shit, just like your opinions",
			"Decentralized, just like a sewer",
			"Blogging the size of my penis: micro",
			"Hop in! The water's fine",
			"Like if the blue bird took a shit on your winshield"
		],
		typeSpeed: 85,
		backSpeed: 45,
		backDelay: 780,
		loopDelay: 12000
	});
});
