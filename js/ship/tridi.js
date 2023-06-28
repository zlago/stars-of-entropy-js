ship.tridipyra = class extends ship.template {
	static hp = 15;
	static dmg = 5;
	static size = 6;
	static hitbox = 3;
	static speed = .1;
	static drift = .2;
	static spin = .6;
	static colors = [
		"#00f",
		"#0f0",
		"#0ff",
		"#f00",
		"#f0f",
		"#ff0",
		"#fff",
	];
	static spawn = 1;
	constructor(x = 0, y = 0, ...a) {
		super(x, y, a);
		this.spin ??= 0;
		this.cooldown ??= 0;
		this.color ??= this.constructor.colors[rand(this.constructor.colors.length)];
	}
	update() {
		if (player + 1) {
			// accelerate
			const dir = Math.atan2(actor[player].x - this.x, actor[player].y - this.y);
			this.xVel += Math.sin(dir) * this.constructor.speed;
			this.yVel += Math.cos(dir) * this.constructor.speed;
			// course correct
			if (this.cooldown-- <= 0) {
				this.xVel *= this.constructor.drift;
				this.yVel *= this.constructor.drift;
				this.cooldown = rand(60) + 30;
			}
			// collide
			collide(this, actor[player], this.constructor.dmg);
		}
		// move
		this.x += this.xVel;
		this.y += this.yVel;
	}
	draw() {
		ctx.beginPath();
		ctx.strokeStyle = this.color;
		ctx.moveTo(this.x, this.y + this.size);
		// math
		if (this.spin < 0) {
			this.spin = (this.spin % (TAU)) + TAU;
		}
		const l = [
			Math.sin(this.spin) * this.size,
			Math.sin(this.spin + TAU / 3) * this.size,
			Math.sin(this.spin + TAU / 1.5) * this.size
		];
		const lmin = Math.min(...l), lmax = Math.max(...l);
		if ((this.spin + TAU / 12) % (TAU / 3) > TAU / 6) {
			// line left
			ctx.lineTo(this.x + lmin, this.y);
			ctx.lineTo(this.x, this.y - this.size);
			// line right
			ctx.lineTo(this.x + lmax, this.y);
			ctx.lineTo(this.x, this.y + this.size);
		} else {
			for (let i = l.length; i-- > 0;) {
				ctx.lineTo(this.x + l[i], this.y);
				ctx.lineTo(this.x, this.y + (i % 2? this.size: -this.size));
			}
		}
		// line h
		ctx.moveTo(this.x + lmin, this.y);
		ctx.lineTo(this.x + lmax, this.y);
		ctx.stroke();
		// mod
		this.spin += this.xVel / this.size * this.constructor.spin;
	}
}
