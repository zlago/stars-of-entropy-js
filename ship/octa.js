globalThis.octahedronShip = class extends ship {
	static hp = 35;
	static dmg = 10;
	static size = 8;
	static hitbox = 4;
	static speed = 0.1;
	static spin = 0.1;
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
		this.spin ??= 0;
		this.cooldown ??= 120;
		this.color ??= this.constructor.colors[rand(this.constructor.colors.length)];
	}
	update() {
		if (player + 1) {
			// accelerate
			const dir = Math.atan2(actor[player].x - this.x, actor[player].y - this.y);
			this.xVel += Math.sin(dir) * this.constructor.speed;
			this.yVel += Math.cos(dir) * this.constructor.speed;
			// pew
			if (this.cooldown-- <= 0) {
				const x = this.x - actor[player].x,
				y = this.y - actor[player].y
				// stop
				this.xVel = 0;
				this.yVel = 0;
				// shoot
				bullet.add(new peaShot(
					this,
					(actor[player].x - this.x) * 0.015,
					(actor[player].y - this.y) * 0.015)
				);
				// reset
				this.cooldown = rand(90) + 30;
			}
			// collide
			collide(this, actor[player], this.constructor.dmg);
		}
		// move
		this.x += this.xVel;
		this.y += this.yVel;
	}
	hurt(dmg) {
		if ((this.hp -= dmg) <= 0) {
			if (rand(4)) {
				actor[this.index] = new powerup("heal", this);
			} else {
				actor[this.index] = new powerup("weapon", this, rand(2)? "sniper": "shot");
			}
			actor[this.index].index = this.index;
		}
		return true;
	}
	powerUp(i) {
		if (i.power == "heal") {
			return i[i.power](this);
		} return false;
	}
	draw() {
		ctx.beginPath();

		ctx.strokeStyle = this.color || this.constructor.colors[rand(this.constructor.colors.length)];
		const l = [
			Math.sin(this.spin) * this.size,
			Math.sin(this.spin + Math.PI * 0.5) * this.size,
			Math.sin(this.spin + Math.PI) * this.size,
			Math.sin(this.spin + Math.PI * 1.5) * this.size
		];
		const lmin = Math.min(...l), lmax = Math.max(...l),
		n = mod(Math.round((-this.spin + TAU * 0.5) / TAU * 4 % 4), 4);
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
