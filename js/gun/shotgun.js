gun.shotgun = class extends gun.template {
	static name = "shotgun";
	static ammo = "shell";
	static reload = 60;
	static shots = 8;
	static recoil = 3;
	fire() {
		if (this.reload > 0) {return false;}
		const sin = Math.sin(this.parent.rot), cos = Math.cos(this.parent.rot),
		v = 3 * Math.floor(Math.sqrt((this.parent.xVel ** 2) + (this.parent.yVel ** 2))),
		range = (3 + v) * .02;
		for (let i = this.constructor.shots; i > 0; i--) {
			const offX = randRange(range), offY = randRange(range);
			bullet.add(new shot[this.constructor.ammo](this.parent, sin + offX, cos + offY));
		}
		this.parent.xVel += -sin * this.constructor.recoil;
		this.parent.yVel += -cos * this.constructor.recoil;
		this.reload = this.constructor.reload;
		return true;
	}
}

shot.shell = class extends shot.template {
	static hp = 12;
	static dmg = 3;
	static size = 1.5;
	static hitbox = 1.5;
	static speed = 5;
	constructor(parent, x = 0, y = 0, a) {
		super(parent, x, y, a);
		this.hp += rand(5);
	}
	draw() {
		const a = this.size;
		ctx.beginPath();
		ctx.strokeStyle = "#0f0";
		ctx.moveTo(this.x + a, this.y - a);
		ctx.lineTo(this.x - a, this.y + a);
		ctx.moveTo(this.x - a, this.y - a);
		ctx.lineTo(this.x + a, this.y + a);
		ctx.stroke();
	}
}
