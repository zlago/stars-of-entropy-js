class octahedronShip {
	static hp = 5;
	static dmg = 10;
	static size = 8;
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
				// pew
				if (this.cooldown-- <= 0) {
					// stop
					this.xVel = 0;
					this.yVel = 0;
					// shoot
					/*enemyBullets.push(new bulletPlayer(
						this.x, this.y,
						(actor[player].x - this.x) * 0.05,
						(actor[player].y - this.y) * 0.05
					));*/
					// reset
					this.cooldown = rand(90) + 30;
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
		this.hp -= dmg;
		return true;
	}
	draw() {
		ctx.beginPath();
		ctx.strokeStyle = this.color? this.color: this.constructor.colors[rand(this.constructor.colors.length)];
		const l = [
			Math.sin(this.rot) * this.size,
			Math.sin(this.rot + Math.PI * 0.5) * this.size,
			Math.sin(this.rot + Math.PI) * this.size,
			Math.sin(this.rot + Math.PI * 1.5) * this.size
		];
		const lmin = Math.min(...l), lmax = Math.max(...l),
		n = mod(Math.round((-this.rot + TAU * 0.5) / TAU * 4 % 4), 4);
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
		this.rot += this.xVel * this.constructor.spin;
	}
}
