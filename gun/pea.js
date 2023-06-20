class bulletPlayer {
	static hp = 30;
	static dmg = 1;
	static size = 1.5;
	static speed = 3;
	constructor(x, y, x1, y1, x2, y2) {
		this.hp = this.constructor.hp;
		this.x = x;
		this.y = y;
		this.xVel = x1 + x2 * this.constructor.speed;
		this.yVel = y1 + y2 * this.constructor.speed;
		this.size = this.constructor.size;
	}
	update(index) {
		if (this.hp-- > 0) {
			// move
			this.x += this.xVel;
			this.y += this.yVel;
			// hurt
			for (const i in actor) {
				if (collide(this, actor[i], this.constructor.dmg)) {
					delete bullet[index];
					break;
				}
			}
		} else {
			// die
			delete bullet[index];
		}
	}
	draw() {
		const a = this.constructor.size;
		ctx.beginPath();
		ctx.strokeStyle = "#0ff";
		ctx.moveTo(this.x + a, this.y - a);
		ctx.lineTo(this.x - a, this.y + a);
		ctx.moveTo(this.x - a, this.y - a);
		ctx.lineTo(this.x + a, this.y + a);
		ctx.stroke();
	}
}
