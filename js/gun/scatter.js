gun.scatter = class extends gun.template {
	static name = "scatter";
	static ammo = "scatter";
	static reload = 8;
	static spread = TAU * .02;
	fire() {
		if (this.reload > 0) {return false;}
		const spread = randRange(this.constructor.spread),
		sin = Math.sin(this.parent.rot + spread), cos = Math.cos(this.parent.rot + spread);
		bullet.add(new shot[this.constructor.ammo](this.parent, sin, cos));
		this.reload = this.constructor.reload;
		return true;
	}
}

shot.scatter = class extends shot.template {
	static hp = 25;
	static dmg = 8;
	static size = 1.2;
	static hitbox = 1.5;
	static speed = 4;
	draw() {
		ctx.beginPath();
		ctx.strokeStyle = "#fff";
		ctx.arc(this.x, this.y, this.size, 0, TAU);
		ctx.stroke();
	}
}
