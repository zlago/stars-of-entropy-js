gun.flamer = class extends gun.template {
	static name = "flamer";
	static ammo = "flame";
	static reload = 2;
	fire() {
		if (this.reload > 0) {return false;}
		const sin = Math.sin(this.parent.rot),
		cos = Math.cos(this.parent.rot);
		const offX = (rand(15) - 7) * .02, offY = (rand(15) - 7) * .02;
		bullet.add(new shot[this.constructor.ammo](this.parent, sin + offX, cos + offY));
		this.reload = this.constructor.reload;
		return true;
	}
}

shot.flame = class extends shot.template {
	static hp = 15;
	static dmg = 1;
	static size = 6;
	static hitbox = 4;
	static speed = 2;
	static frict = .95;
	update() {
		if (this.hp-- > 0) {
			// move
			this.x += this.xVel;
			this.y += this.yVel;
			this.xVel *= this.constructor.frict;
			this.yVel *= this.constructor.frict;
			// hurt
			for (const i in actor) {
				if (actor[i] != this.parent) {
					if (collide(this, actor[i], this.constructor.dmg)) {
						// instead of disappearing on impact, the flame decays
						if ((this.hp -= 2) < 0) {
							delete bullet[this.index];
							break;
						}
					}
				}
			}
		} else {
			delete bullet[this.index];
		}
	}
	draw() {
		const a = this.size - this.hp * 0.25;
		ctx.beginPath();
		ctx.strokeStyle = "#0" + this.hp.toString(16) + "f";
		ctx.arc(this.x, this.y, a, 0, TAU);
		ctx.stroke();
	}
}
