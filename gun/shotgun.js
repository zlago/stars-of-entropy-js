globalThis.shotGun = class extends gun {
	static reload = 60;
	static ammo = "spreadShot";
	static shots = 8;
	static recoil = 3;
	static name = "shot";
	fire() {
		if (this.reload > 0) {return false;}
		const sin = Math.sin(this.parent.rot),
		cos = -Math.cos(this.parent.rot);
		for (let i = this.constructor.shots; i > 0; i--) {
			const offX = (rand(15) - 7) * 0.02, offY = (rand(15) - 7) * 0.02;
			bullet.add(new globalThis[this.constructor.ammo](this.parent, sin + offX, cos + offY));
		}
		this.parent.xVel += -sin * this.constructor.recoil;
		this.parent.yVel += -cos * this.constructor.recoil;
		this.reload = this.constructor.reload;
		return true;
	}
}

globalThis.spreadShot = class extends shot {
	static hp = 16;
	static dmg = 3;
	static size = 1.5;
	static hitbox = 1.5;
	static speed = 5;
	constructor(parent, x = 0, y = 0, ...a) {
		super(parent, x, y, a);
		this.hp += rand(8);
	}
	draw() {
		const a = this.size;
		ctx.beginPath();
		ctx.strokeStyle = "#ff0";
		ctx.moveTo(this.x + a, this.y - a);
		ctx.lineTo(this.x - a, this.y + a);
		ctx.moveTo(this.x - a, this.y - a);
		ctx.lineTo(this.x + a, this.y + a);
		ctx.stroke();
	}
}