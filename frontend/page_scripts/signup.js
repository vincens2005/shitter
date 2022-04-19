function signup() {
	let username = document.querySelector("#username").value;
	let password = document.querySelector("#password").value;
	
	if (!username) {
		document.querySelector("#error").innerHTML = "please pick a username"
		return;
	}
	
	if (!password) {
		document.querySelector("#error").innerHTML = "please choose a nice tasty password"
		return;
	}
	
	user.create(username, password, response => {
		if (response.err) return document.querySelector("#error").innerHTML = response.err.replace("created!", "exists").replace("User", "Username");
		
		user.auth(username, password, u => { // callbacks, ugh
			user.get("name").put(username, a => {
				gun.get("shitter_users").set({
					username,
					id: u.soul
				}, () => {
					location = "home.html";
				});
			});
		});
	});
}
