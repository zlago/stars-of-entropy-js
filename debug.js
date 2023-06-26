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
		const v = document.getElementById("weaponSelect").value;
		actor.add(new powerup("weapon", undefined, v));
	},
	enemy : function() {
		spawn(document.getElementById("enemySelect").value);
	},
	hp : function() {
		if (player + 1) {
			actor[player].hp = document.getElementById("hpSelect").value;
		} else {
			player = actor.add(new playerShip());
		}
	},
	blur : () => afterImage = Math.max(afterImage, 0) + 30,
	hitboxes : e => showHitboxes = e.target.checked,
	pass : {
		get : function() {
			document.getElementById("passField").value;
		},
		set : function() {
			document.getElementById("passField").value;
		}
	},
	geno : function() {
		for (const i of actor) {if (i != actor[player]) {i?.hurt?.(Infinity);}}
	},
	lookup : {
		weaponButton : "weapon", enemyButton : "enemy",
		hpButton : "hp", passGet : "pass.get", passSet : "pass.set",
		hitboxes : "hitboxes", blur : "blur", geno : "geno"
	}
}

debug.menu.addEventListener("click", e => {debug[debug.lookup[e.target.id]]?.(e);});
