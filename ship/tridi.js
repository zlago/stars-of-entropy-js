class tridipyraShip {
	static hp = 3;
	static dmg = 5;
	static size = 6;
	static speed = 0.1;
	static drift = 0.20;
	static spin = 0.6;
	static colors = [
		"#00f",
		"#0f0",
		"#0ff",
		"#f00",
		"#f0f",
		"#ff0",
		"#fff",
	];
	constructor(x = 0, y = 0, ...a) {
		this.hp = this.constructor.hp;
		this.x = x;
		this.y = y;
		this.rot = 0;
		this.xVel = 0;
		this.yVel = 0;
		this.size = this.constructor.size;
		this.cooldown = 0;
		this.color = this.constructor.colors[rand(this.constructor.colors.length)];
	}
	update(index) {
		if (this.hp > 0) {
			if (player + 1) {
				// accelerate
				const dir = Math.atan2(actor[player].x - this.x, actor[player].y - this.y);
				this.xVel += Math.sin(dir) * this.constructor.speed;
				this.yVel += Math.cos(dir) * this.constructor.speed;
				// hell
				if (this.cooldown-- <= 0) {
					// thing
					this.xVel *= this.constructor.drift;
					this.yVel *= this.constructor.drift;
					// reset
					this.cooldown = rand(60) + 30;
				}
				// collide
				collide(this, actor[player], this.constructor.dmg)
			}
			// move
			this.x += this.xVel;
			this.y += this.yVel;
		} else {
			delete actor[index];
		}
	}
	hurt(dmg) {
		this.hp -= dmg
		return true;
	}
	draw() {
		ctx.beginPath();
		ctx.strokeStyle = this.color;
		ctx.moveTo(this.x, this.y + this.size);
		// math
		if (this.rot < 0) {
			this.rot = (this.rot % (TAU)) + TAU;
		}
		const l = [
			Math.sin(this.rot) * this.size,
			Math.sin(this.rot + TAU / 3) * this.size,
			Math.sin(this.rot + TAU / 1.5) * this.size
		];
		const lmin = Math.min(...l), lmax = Math.max(...l);
		if ((this.rot + TAU / 12) % (TAU / 3) > TAU / 6) {
			// line left
			ctx.lineTo(this.x + lmin, this.y);
			ctx.lineTo(this.x, this.y - this.size);
			// line right
			ctx.lineTo(this.x + lmax, this.y);
			ctx.lineTo(this.x, this.y + this.size);
		} else {
			for (let i = l.length; i-- > 0;) {
				ctx.lineTo(this.x + l[i], this.y);
				ctx.lineTo(this.x, this.y + (i % 2? this.size: -this.size));}
		}
		// line h
		ctx.moveTo(this.x + lmin, this.y);
		ctx.lineTo(this.x + lmax, this.y);
		ctx.stroke();
		// mod
		this.rot += this.xVel / this.size * this.constructor.spin;
	}
}
