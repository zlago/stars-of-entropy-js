globalThis.sniperGun = class extends gun {
	static reload = 90;
	static ammo = "boltShot";
	static name = "sniper";
	draw() {
		ctx.beginPath();
		ctx.strokeStyle = this.reload <= 0? "#0f07": "#0f03";
		ctx.moveTo(this.parent.x, this.parent.y);
		ctx.lineTo(
			this.parent.x + Math.sin(this.parent.rot) * boltShot.speed * boltShot.hp,
			this.parent.y - Math.cos(this.parent.rot) * boltShot.speed * boltShot.hp
			)
		ctx.stroke();
	}
}

globalThis.boltShot = class extends shot {
	static hp = 10;
	static dmg = 15;
	static size = 1;
	static hitbox = 1;
	static speed = 30;
	update() {
		if (this.hp-- > 0) {
			// move
			this.x += this.xVel;
			this.y += this.yVel;
			// hurt
			for (const i in actor) {
				if (actor[i] != this.parent) {
					if (lineRect({
						x1: this.x - this.xVel, x2: this.x,
						y1: this.y - this.yVel, y2: this.y,
						}, actor[i], this.constructor.dmg)) {
						delete bullet[this.index];
						break;
					}
				}
			}
		} else {
			delete bullet[this.index];
		}
	}
	draw() {
		ctx.beginPath();
		ctx.strokeStyle = "#ff0";
		ctx.moveTo(this.x - this.xVel, this.y - this.yVel);
		ctx.lineTo(this.x, this.y);
		ctx.stroke();
	}
}
