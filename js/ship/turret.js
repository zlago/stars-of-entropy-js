ship.turret = class extends ship.template {
	static hp = 50;
	static dmg = 15;
	static size = 8;
	static hitbox = 4;
	static speed = .1;
	static spin = .1;
	static frict = .95;
	static guns = [
		"missile",
		"scatter",
		"sniper",
		"shotgun",
	];
	static spawn = 3;
	constructor(x = 0, y = 0, a) {
		super(x, y, a);
		this.gun ??= this.constructor.guns[rand(this.constructor.guns.length)];
		this.gun = new gun[this.gun](this);
		this.spin ??= 0;
		this.frict ??= this.constructor.frict;
	}
	update() {
		if (player + 1) {
			this.gun.update();
			// aim
			if (1) {
				this.rot = Math.atan2(actor[player].x - this.x, actor[player].y - this.y);
			} else {
				const target = actor[player];
				const ticks = Math.sqrt((this.x - target.x) ** 2 + (this.y - target.y) ** 2) / shot[this.gun.constructor.ammo].speed;
		

				this.rot = Math.atan2(target.x + target.xVel * ticks - this.x, target.y + target.yVel * ticks- this.y);
			}
			// pew
			const x = this.x - actor[player].x, y = this.y - actor[player].y;
			if (x ** 2 + y ** 2 < this.gun.range ** 2) {
				this.gun.fire();
			}
			// collide
			collide(this, actor[player], this.constructor.dmg);
		}
		//
		this.xVel *= this.frict;
		this.yVel *= this.frict;
	}
	hurt(dmg) {
		if ((this.hp -= dmg) <= 0) {
			actor[this.index] = new ship.powerup("weapon", this, this.gun.name);
			actor[this.index].index = this.index;
		}
		return true;
	}
	powerUp(i) {
		if (i.power != "weapon" || this.gun.name == "pea") {
			return i[i.power](this);
		} return false;
	}
	draw() {
		this.gun.draw?.();
		ctx.beginPath();
		ctx.strokeStyle = "#fff7";
		// base rect
		ctx.strokeRect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
		// base diamond
		ctx.moveTo(this.x + this.size, this.y);
		ctx.lineTo(this.x, this.y + this.size);
		ctx.lineTo(this.x - this.size, this.y);
		ctx.lineTo(this.x, this.y - this.size);
		ctx.lineTo(this.x + this.size, this.y);
		//
		ctx.stroke();
		ctx.beginPath();
		ctx.strokeStyle = "#fff";
		const x = this.x + this.xVel, y = this.y + this.yVel, sin = Math.sin(this.rot) * this.size, cos = Math.cos(this.rot) * this.size;
		ctx.moveTo(x - cos * .4, y + sin * .4);
		ctx.lineTo(x + sin - cos * .4, y + cos + sin * .4);
		ctx.lineTo(x + sin + cos * .4, y + cos - sin * .4);
		ctx.lineTo(x + cos * .4, y - sin * .4);
		ctx.lineTo(x - sin + cos * .8, y - cos - sin * .8);
		ctx.lineTo(x - sin * .6, y - cos * .6);
		ctx.lineTo(x - sin - cos * .8, y - cos + sin * .8);
		ctx.lineTo(x - cos * .4, y + sin * .4);
		ctx.lineTo(x + cos * .4, y - sin * .4);
		ctx.stroke();
	}
}
