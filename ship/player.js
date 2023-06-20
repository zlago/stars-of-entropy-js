class shipPlayer {
	static hp = 30;
	static size = 4;
	static speed = 0.25;
	static frict = 0.95;
	static spin = 0.3;
	static bulletCooldown = 7;
	static iframes = 15;
	constructor(x = canvas.width * 0.5,
	y = canvas.height * 0.5, ...a) {
		this.hp = this.constructor.hp;
		this.x = x;
		this.y = y;
		this.rot = 0;
		this.xVel = 0;
		this.yVel = 0;
		this.size = this.constructor.size;
		this.bulletCooldown = 0;
		this.iframes = 60;
	}
	update(index) {
		if (this.hp > 0) {
			this.iframes--
			// rotate
			this.rot += (buttons[rightKey] - buttons[leftKey]) * this.constructor.spin;
			const sin = Math.sin(this.rot), cos = Math.cos(this.rot);
			// accelerate
			if (buttons[aKey]) {
				this.xVel += sin * this.constructor.speed;
				this.yVel += cos * this.constructor.speed;
			}
			// move
			this.x += this.xVel;
			this.y -= this.yVel;
			// deaccelerate
			this.xVel *= this.constructor.frict;
			this.yVel *= this.constructor.frict;
			// shoot
			if (this.bulletCooldown-- <= 0 && buttons[sKey]) {
				const sin = Math.sin(this.rot), cos = Math.cos(this.rot);
				bullet.push(new bulletPlayer(this.x, this.y, this.xVel, -this.yVel, sin, -cos));
				this.bulletCooldown = this.constructor.bulletCooldown;
			}
		} else {
			player = undefined;
			delete actor[index];
		}
	}
	hurt(dmg) {
		if (this.iframes <= 0) {
			this.hp -= dmg;
			this.iframes = this.constructor.iframes;
			return true;
		}
		return false;
	}
	draw() {
		ctx.beginPath();
		ctx.strokeStyle = "#aaa";
		let x = this.x, y = this.y, // default in bounds
		size = this.size * 0.5; // default OOB
		if (this.x < 8 || this.x > canvas.width - 8) {
			const hori = clamp(this.x, 8, canvas.width - 8);
			if (this.y < 8 || this.y > canvas.height - 8) {
				// hori & vert OOB
				const vert = clamp(this.y, 8, canvas.height - 8),
				rot = Math.atan2(this.x - hori, this.y - vert),
				sin = Math.sin(rot) * 4, cos = Math.cos(rot) * 4;
				ctx.moveTo(hori + cos, vert - sin);
				ctx.lineTo(hori + sin, vert + cos);
				ctx.lineTo(hori - cos, vert + sin);
				x = hori - sin;
				y = vert - cos;
			} else {
				// horizontally OOB
				x = clamp(this.x, 12, canvas.width - 12);
				const hori2 = clamp(this.x, 4, canvas.width - 4);
				ctx.moveTo(hori, this.y + 4);
				ctx.lineTo(hori2, this.y);
				ctx.lineTo(hori, this.y - 4);
			}
		} else if (this.y < 8 || this.y > canvas.height - 8) {
			// vertically OOB
			y = clamp(this.y, 12, canvas.height - 12);
			const vert = clamp(this.y, 8, canvas.height - 8),
			vert2 = clamp(this.y, 4, canvas.height - 4);
			ctx.moveTo(this.x + 4, vert);
			ctx.lineTo(this.x, vert2);
			ctx.lineTo(this.x - 4, vert);
		} else {
			// in bounds
			size = this.size;
			if (this.iframes > 0) {
				ctx.strokeStyle = "#aaa";
			} else {
				ctx.strokeStyle = "#fff";
			}
		}
			const sin = Math.sin(this.rot) * size,
			cos = Math.cos(this.rot) * size;
			ctx.moveTo(x - sin - cos, y - sin + cos);
			ctx.lineTo(x + sin, y - cos);
			ctx.lineTo(x - sin + cos, y + sin + cos);
		ctx.stroke();
	}
}
