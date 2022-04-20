let working = false;
function signup() {
	if (working) return;
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
	
	working = true;
	document.querySelector("#loginbutton").setAttribute("aria-busy", "true");
	
	user.create(username, password, response => {
		if (response.err) {
			doneworking();
			document.querySelector("#error").innerHTML = response.err.replace("created!", "exists").replace("User", "Username");
			return;
		}
		
		console.log("made user!");
		
		user.auth(username, password, u => { // callbacks, ugh
			console.log("logged in!");
			
			user.get("name").put(username, a => {
				gun.get("shitter_usersv3").set({
					username,
					id: user.is.alias
				}, () => {
					console.log("user added to directory");
					doneworking();
					location = "home.html";
				});
			});
		});
	});	

}

function doneworking() {
	working = false;
	document.querySelector("#loginbutton").setAttribute("aria-busy", "false");
}
