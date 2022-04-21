let working = false;
async function signup() {
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
		
		user.auth(username, password, async () => { // callbacks, ugh
			console.log("logged in!");
			
			await user.get("name").put(username).then();
			await gun.get(user_db + "/" + username).put({user}).then();
			
			gun.get(user_db + "/" + username).put(user, () => {
				console.log("user added to database!");
				doneworking();
				location = "home.html"
			});
		});
	});	

}

function doneworking() {
	working = false;
	document.querySelector("#loginbutton").setAttribute("aria-busy", "false");
}
