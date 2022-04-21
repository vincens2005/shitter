// TODO: yeah do this
user = await gun.get("shitter_users/" + username);

realuser = await gun.user(user.id).then()
