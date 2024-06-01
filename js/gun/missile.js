gun.missile = class extends gun.template {
	static name = "missile";
	static ammo = "missile";
	static reload = 120;
	static spread = TAU * .05;
	constructor(parent, a) {
		super(parent, a);
		this.range = shot.missile.range;
	}
	fire() {
		if (this.reload > 0) {return false;}
		{const sin = Math.sin(this.parent.rot + this.constructor.spread),
		cos = Math.cos(this.parent.rot + this.constructor.spread);
		actor.add(new shot[this.constructor.ammo](this.parent, sin, cos));}
		{const sin = Math.sin(this.parent.rot - this.constructor.spread),
		cos = Math.cos(this.parent.rot - this.constructor.spread);
		actor.add(new shot[this.constructor.ammo](this.parent, sin, cos));}
		this.reload = this.constructor.reload;
		return true;
	}
}

shot.missile = class extends shot.template {
	static hp = 240;
	static dmg = 10;
	static size = 2.5;
	static hitbox = 1.5;
	static speed = 3;
	static velo = .2;
	static frict = .97;
	static range = 192;
	constructor(parent, x = 0, y = 0, a) {
		super(parent, x, y, a);
		this.rot = parent.rot;
		this.seek();
	}
	seek() {
		this.target = undefined;
		let targetX = this.constructor.range * .5, targetY = this.constructor.range * .5;
		for (const i in actor) {
			if (actor[i] != this.parent && actor[i].hp &&
				actor[i].constructor != this.constructor) {
				const xdel = Math.abs(this.x - actor[i].x);
				const ydel = Math.abs(this.y - actor[i].y);
				if (xdel + ydel < targetX + targetY) {
					this.target = i;
					targetX = xdel; targetY = ydel;
				}
			}
		}
		const target = actor[this.target];
		ctx.beginPath();
		ctx.strokeStyle = "#f007";
		ctx.arc(target?.x, target?.y, target?.size * 1.5, 0, TAU);
		ctx.stroke();
	}
	hurt = () => {
		delete actor[this.index];
		return true;
	}
	update() {
		if (this.hp-- > 0) {
			if (actor[this.target]?.hp) {
				const xdel = Math.abs(this.x - actor[this.target].x);
				const ydel = Math.abs(this.y - actor[this.target].y);
				if (xdel + ydel < this.constructor.range) {
					// home in
					if (1) {
						this.rot = Math.atan2(actor[this.target].x - this.x, actor[this.target].y - this.y);
					} else {
						const target = actor[this.target];
						const ticks = Math.sqrt((this.x - target.x) ** 2 + (this.y - target.y) ** 2) / Math.sqrt(this.xVel ** 2 + this.yVel ** 2);
						this.rot = Math.atan2(target.x + target.xVel * ticks - this.x, target.y + target.yVel * ticks- this.y);
					}
					this.xVel += Math.sin(this.rot) * this.constructor.velo;
					this.yVel += Math.cos(this.rot) * this.constructor.velo;
				} else {
					// out of range, seek new target
					this.seek();
				}
			} else {
				this.seek();
			}
			// move
			this.x += this.xVel;
			this.y += this.yVel;
			// deacc
			this.xVel *= this.constructor.frict;
			this.yVel *= this.constructor.frict;
			// hurt
			for (const i in actor) {
				if (actor[i] != this.parent &&
					actor[i].constructor != this.constructor) {
					if (collide(this, actor[i], this.constructor.dmg)) {
						delete actor[this.index];
						break;
					}
				}
			}
		} else {
			delete actor[this.index];
		}
	}
	draw() {
		ctx.beginPath();
		ctx.strokeStyle = "#fff";
		const sin = Math.sin(this.rot) * this.size,
		cos = Math.cos(this.rot) * this.size;
		ctx.moveTo(this.x + cos, this.y - sin);
		ctx.lineTo(this.x + sin, this.y + cos);
		ctx.lineTo(this.x - cos, this.y + sin);
		if (this.target + 1) {
		ctx.stroke(); ctx.beginPath();
		ctx.strokeStyle = rand(2)? "#0ff": "#00f";
		ctx.arc(this.x - sin, this.y - cos, this.size * .5, 0, TAU);
		}
		ctx.stroke();
	}
}
