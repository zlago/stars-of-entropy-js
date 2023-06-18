class shipPlayer {
	static abc = 50;
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
		this.hp = 30;
		this.xVel = 0;
		this.yVel = 0;
		this.size = 4;
		this.rot = 0;
		this.accel = 0.25;
		this.frict = 0.95;
		this.bulletSpeed = 3;
		this.bulletCooldown = 0;
		this.bulletCooldownMax = 7;
		this.iframes = 30;
	}
	update() {
		if (this.hp > 0) {
			this.iframes--
			// rotate
			this.rot += (buttons[rightKey] - buttons[leftKey]) / 3
			let sin = Math.sin(this.rot);
			let cos = Math.cos(this.rot);
			// accelerate
			if (buttons[aKey]) {
				this.xVel += sin * this.accel;
				this.yVel += cos * this.accel;
			}
			// move
			this.x += this.xVel;
			this.y -= this.yVel;
			// deaccelerate
			this.xVel *= this.frict;
			this.yVel *= this.frict;
			// shoot
			if (this.bulletCooldown-- <= 0 && buttons[sKey]) {
				let sin = Math.sin(this.rot) * this.bulletSpeed;
				let cos = Math.cos(this.rot) * this.bulletSpeed;
				playerBullets.push(new bulletPlayer(this.x, this.y, this.xVel + sin, -this.yVel - cos));
				this.bulletCooldown = this.bulletCooldownMax;
			}
		}
	}
	hurt(dmg) {
		if (this.iframes <= 0) {
			this.hp -= dmg;
			this.iframes = 15;
			return true;
		}
		return false;
	}
	draw() {
		ctx.beginPath();
		ctx.strokeStyle = "#aaa";
		let x = this.x; // default in bounds
		let y = this.y;
		let size = this.size / 2; // default OOB
		if (this.x < 8 || this.x > canvas.width - 8) {
			const hori = clamp(this.x, 8, canvas.width - 8);
			if (this.y < 8 || this.y > canvas.height - 8) {
				// hori & vert OOB
				const vert = clamp(this.y, 8, canvas.height - 8);
				const rot = Math.atan2(this.x - hori, this.y - vert);
				const sin = Math.sin(rot) * 4;
				const cos = Math.cos(rot) * 4;
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
			const vert = clamp(this.y, 8, canvas.height - 8);
			const vert2 = clamp(this.y, 4, canvas.height - 4);
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
			const sin = Math.sin(this.rot) * size;
			const cos = Math.cos(this.rot) * size;
			ctx.moveTo(x - sin - cos, y - sin + cos);
			ctx.lineTo(x + sin, y - cos);
			ctx.lineTo(x - sin + cos, y + sin + cos);
		ctx.stroke();
	}
}
