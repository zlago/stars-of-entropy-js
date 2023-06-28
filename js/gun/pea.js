gun.pea = class extends gun.template {
	static name = "pea";
	static ammo = "pea";
	static reload = 7;
}

shot.pea = class extends shot.template {
	static hp = 30;
	static dmg = 5;
	static size = 1.5;
	static hitbox = 1.5;
	static speed = 3;
	draw() {
		ctx.beginPath();
		ctx.strokeStyle = "#0f0";
		ctx.arc(this.x, this.y, this.size, 0, TAU);
		ctx.stroke();
	}
}
