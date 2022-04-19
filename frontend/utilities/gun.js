/*
	<script src="https://cdn.jsdelivr.net/npm/gun/gun.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/gun/sea.js"></script>
*/
const gun = Gun(["https://gunpewpew.herokuapp.com/gun", "https://gun-manhattan.herokuapp.com/gun", "https://gun-us.herokuapp.com/gun"]);
const user = gun.user().recall({sessionStorage: true});
