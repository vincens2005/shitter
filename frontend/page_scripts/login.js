function login() {
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
	
	
	user.auth(username, password, response => {
		if (response.err) return document.querySelector("#error").innerHTML =  "Username or password incorrect";
		console.log("big work!!!!");
		location = "home.html";
	});
}
