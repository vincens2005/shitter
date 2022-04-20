// TODO: yeah do this
user = await gun.get(user_db).map(u => u.username == "MrGay42069" ? u : undefined).then()

realuser = await gun.user(user.id).then()
