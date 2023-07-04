ship.hauler = class extends ship.template {
	// todo: finish this ><
	static hp = 35;
	static dmg = 10;
	static size = 8;
	static hitbox = 4;
	static speed = .1;
	static spin = .1;
	static items = [
		"pea",
		"shotgun",
		"missile",
		"sniper",
		"flamer",
		"scatter",
	];
	static colors = [
		"#00f",
		"#0f0",
		"#0ff",
		"#f00",
		"#f0f",
		"#ff0",
		"#fff",
	];
	static spawn = 2;
	constructor(x = 0, y = 0, ...a) {
		super(x, y, a);
		const items = this.constructor.items;
		this.item ??= items[rand(items.length)];
		this.spin ??= 0;
		this.cooldown ??= 120;
		const colors = this.constructor.colors;
		this.color ??= colors[rand(colors.length)];
	}
	update() {
		if (player + 1) {
			// accelerate
			this.rot = Math.atan2(actor[player].x - this.x, actor[player].y - this.y);
			this.xVel += Math.sin(this.rot) * this.constructor.speed;
			this.yVel += Math.cos(this.rot) * this.constructor.speed;
			// course correct
			if (this.cooldown-- <= 0) {
				this.xVel = 0, this.yVel = 0;
				this.cooldown = (rand(90) + 30);
			}
			// pew
			const x = this.x - actor[player].x, y = this.y - actor[player].y;
			// collide
			collide(this, actor[player], this.constructor.dmg);
		}
		// move
		this.x += this.xVel;
		this.y += this.yVel;
	}
	hurt(dmg) {
		if ((this.hp -= dmg) <= 0) {
			actor[this.index] = new ship.powerup("weapon", this, this.item);
			actor[this.index].index = this.index;
		}
		return true;
	}
	draw() {
		ctx.beginPath();
		ctx.strokeStyle = this.color || this.constructor.colors[rand(this.constructor.colors.length)];
		const l = [
			Math.sin(this.spin) * this.size,
			Math.sin(this.spin + Math.PI * .5) * this.size,
			Math.sin(this.spin + Math.PI) * this.size,
			Math.sin(this.spin + Math.PI * 1.5) * this.size
		];
		const lmin = Math.min(...l), lmax = Math.max(...l),
		n = mod(Math.round((-this.spin + TAU * .5) / TAU * 4 % 4), 4);
		this.n = n;
		ctx.moveTo(this.x, this.y - this.size);
		// diamond
		for (let i = l.length; i-- > 0;) {
			const x = this.x, y = this.y + (i % 2? this.size: -this.size);
			if (i != n) {
				ctx.lineTo(this.x + l[i], this.y);
				ctx.lineTo(x, y);
			} else {
				ctx.moveTo(x, y);
			}
		}
		// line h
		ctx.moveTo(this.x + lmin, this.y);
		ctx.lineTo(this.x + lmax, this.y);
		ctx.stroke();
		// mod
		this.spin += this.xVel * this.constructor.spin;
	}
}
