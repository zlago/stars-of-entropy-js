const debug = {
	menu : document.getElementById("debug"),
	open : function() {
		ticker.pause();
		debug.menu.style.display = "flex";
	},
	close : function() {
		ticker.run();
		debug.menu.style.display = "none";
	},
	weapon : function() {
		const v = document.getElementsByName("weaponSelect")[0].value;
		actor.add(new ship.powerup("weapon", undefined, v));
	},
	enemy : function() {
		spawn(document.getElementsByName("enemySelect")[0].value);
	},
	geno : function() {
		for (const i of actor) {if (i != actor[player]) {i?.hurt?.(Infinity);}}
	},
	hp : function() {
		if (player + 1) {
			actor[player].hp = document.getElementsByName("hpSelect")[0].value;
		} else {
			player = actor.add(new ship.player);
		}
	},
	blur : () => afterImage = Math.max(afterImage, 0) + 30,
	hitboxes : e => showHitboxes = e.target.checked,
	hpbars : e => showHP = e.target.checked,
	pass : {
		get : function() {
			document.getElementsByName("passField")[0].value;
		},
		set : function() {
			document.getElementsByName("passField")[0].value;
		}
	},
	lookup : {
		weaponButton : "weapon", enemyButton : "enemy", geno : "geno",
		hpButton : "hp", passGet : "pass.get", passSet : "pass.set",
		blur : "blur", hitboxes : "hitboxes", hpbars : "hpbars", close : "close"
	}
}

debug.menu.addEventListener("click", e => {debug[debug.lookup[e.target.name]]?.(e);});
