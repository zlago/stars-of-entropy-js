class peaBullet {
	static hp = 30;
	static dmg = 5;
	static size = 1.5;
	static hitbox = 1.5;
	static speed = 3;
	constructor(parent, x = 0, y = 0, ...a) {
		this.hp = this.constructor.hp;
		this.parent = parent;
		this.x = parent.x;
		this.y = parent.y;
		this.xVel = parent.xVel + x * this.constructor.speed;
		this.yVel = parent.yVel + y * this.constructor.speed;
		this.size = this.constructor.size;
		this.hitbox = this.constructor.hitbox;
	}
	update(index) {
		if (this.hp-- > 0) {
			// move
			this.x += this.xVel;
			this.y += this.yVel;
			// hurt
			for (const i in actor) {
				if (actor[i] != this.parent) {
					if (collide(this, actor[i], this.constructor.dmg)) {
						delete bullet[index];
						break;
					}
				}
			}
		} else {
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
