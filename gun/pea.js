class bulletPlayer {
	constructor(x, y, xVel, yVel) {
		this.x = x;
		this.y = y;
		this.xVel = xVel;
		this.yVel = yVel;
		this.size = 1.5;
		this.hp = 30;
	}
	update(i) {
		if (this.hp-- > 0) {
			// move
			this.x += this.xVel;
			this.y += this.yVel;
			// hurt
			for (const i2 in enemy) {
				if (collide(this, enemy[i2])) {
					if (enemy[i2].hurt(1)) {
						remove.push(i);
						break;
					}
				}
			}
		} else {
			// die
			remove.push(i);
		}
	}
	draw() {
		ctx.beginPath();
		ctx.strokeStyle = "#0ff";
		ctx.moveTo(this.x + this.size, this.y - this.size);
		ctx.lineTo(this.x - this.size, this.y + this.size);
		ctx.moveTo(this.x - this.size, this.y - this.size);
		ctx.lineTo(this.x + this.size, this.y + this.size);
		ctx.stroke();
	}
}
