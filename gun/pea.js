globalThis.peaGun = class extends gun {
	static ammo = "peaShot";
	static reload = 7;
	static name = "pea";
}

globalThis.peaShot = class extends shot {
	static hp = 30;
	static dmg = 5;
	static size = 1.5;
	static hitbox = 1.5;
	static speed = 3;
	draw() {
		const a = this.size;
		ctx.beginPath();
		ctx.strokeStyle = "#0f0";
		ctx.ellipse(this.x, this.y, a, a, 0, 0, TAU);
		ctx.stroke();
	}
}
