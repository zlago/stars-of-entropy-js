gun.sniper = class extends gun.template {
	static name = "sniper";
	static ammo = "bolt";
	static reload = 90;
	constructor(parent, ...a) {
		super(parent, a);
		this.reload = this.constructor.reload;
	}
	draw() {
		ctx.beginPath();
		ctx.strokeStyle = this.reload <= 0? "#0f07": "#0f03";
		ctx.moveTo(this.parent.x, this.parent.y);
		ctx.lineTo(
			this.parent.x + Math.sin(this.parent.rot) * shot.bolt.speed * shot.bolt.hp,
			this.parent.y + Math.cos(this.parent.rot) * shot.bolt.speed * shot.bolt.hp
			)
		ctx.stroke();
	}
}

shot.bolt = class extends shot.template {
	static hp = 10;
	static dmg = 20;
	static size = 10;
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
						ctx.beginPath();
						ctx.strokeStyle = "#ff0";
						ctx.moveTo(this.x + this.size, this.y - this.size);
						ctx.lineTo(this.x - this.size, this.y + this.size);
						ctx.moveTo(this.x - this.size, this.y - this.size);
						ctx.lineTo(this.x + this.size, this.y + this.size);
						ctx.stroke();
						if (this.hp-- <= 0) {
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
		ctx.beginPath();
		ctx.strokeStyle = "#f70";
		ctx.moveTo(this.x - this.xVel, this.y - this.yVel);
		ctx.lineTo(this.x, this.y);
		ctx.stroke();
	}
}
