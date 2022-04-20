let working = false;
async function login() {
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
	
	user.auth(username, password, async response => {
		if (response.err) {
			doneworking();
			document.querySelector("#error").innerHTML =  "Username or password incorrect";
			return;
		}
		
		console.log("big work!!!!");
		let userobject = await gun.get(user_db).map(u => u.username == username ? u : undefined).then();
		
		if (!userobject) {
			console.log("user not in directory??");
			gun.get(user_db).set({
					username,
					id: user.is.alias
			}, () => {
				console.log("user added to directory");
				doneworking();
				location = "home.html";
			});
		}
		else {
			doneworking();
			location = "home.html";
		}
		
	});
}

function doneworking() {
	working = false;
	document.querySelector("#loginbutton").setAttribute("aria-busy", "false");
}
