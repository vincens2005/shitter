/*
	<script src="https://cdn.jsdelivr.net/npm/gun/gun.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/gun/sea.js"></script>
*/
const gun = Gun(["https://gun-manhattan.herokuapp.com/gun", "https://gunpewpew.herokuapp.com/gun", "https://gun-us.herokuapp.com/gun"]);
const user = gun.user().recall({sessionStorage: true});
const user_db = "shitter_usersv4";
const shits_db = "shitter_shitsv1";
