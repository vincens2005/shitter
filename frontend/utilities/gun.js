/*
	<script src="https://cdn.jsdelivr.net/npm/gun/gun.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/gun/sea.js"></script>
*/
const gun = Gun(["https://gun-git22-vincens2005-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/gun", "https://gunpewpew.herokuapp.com/gun", "https://gun-manhattan.herokuapp.com/gun"]);
const user = gun.user().recall({sessionStorage: true});
const shitter_version = 7 + (is_dev ? "-dev" : "");
const user_db = "shitter_usersv" + shitter_version;
const shits_db = "shitter_shitsv" + shitter_version;

