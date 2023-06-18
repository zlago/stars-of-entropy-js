class octahedronShip {
	constructor(x = 20, y = 30) {
		this.x = x;
		this.y = y;
		this.xVel = 0;
		this.yVel = 0;
		this.size = 8;
		this.rot = 0;
		this.speed = 0.1;
		this.cooldown = 30;
		this.hp = 5
	}
	update(i) {
		// accelerate
		const dir = Math.atan2(player.x - this.x, player.y - this.y)
		this.xVel += Math.sin(dir) * this.speed
		this.yVel += Math.cos(dir) * this.speed
		// pew
		if (this.cooldown-- <= 0) {
			// stop
			this.xVel = 0;
			this.yVel = 0;
			// shoot
			/*enemyBullets.push(new bulletPlayer(
				this.x, this.y,
				(player.x - this.x) / 20,
				(player.y - this.y) / 20
			));*/
			// reset
			this.cooldown = rand(90) + 30;
		}
		// move
		this.x += this.xVel;
		this.y += this.yVel;
		// collide
		if (collide(this, player)) {
			player.hurt(1)
		};
		if (this.hp <= 0) {
			remove.push(i);
		}
	}
	hurt(dmg) {
		this.hp -= dmg;
		return true;
	}
	draw() {
		ctx.beginPath();
		ctx.strokeStyle = "#fff";
		if (collide(this, player)) {ctx.strokeStyle = "#ff0";}
		// diamond
		ctx.moveTo(this.x - this.size, this.y);
		ctx.lineTo(this.x, this.y - this.size);
		ctx.lineTo(this.x + this.size, this.y);
		ctx.lineTo(this.x, this.y + this.size);
		ctx.lineTo(this.x - this.size, this.y);
		// line h
		ctx.lineTo(this.x + this.size, this.y);
		// lines v
		ctx.moveTo(this.x, this.y + this.size);
		ctx.lineTo(this.x + this.rot, this.y);
		ctx.lineTo(this.x, this.y - this.size);
		ctx.lineTo(this.x - this.rot, this.y);
		ctx.lineTo(this.x, this.y + this.size);
		ctx.stroke();
		// mod
		this.rot += this.xVel;
		if (this.rot < -this.size || this.rot > this.size) {
			if ((this.rot -= this.size * 2) < -this.size) {
				this.rot += this.size * 4;
			}
		}
	}
}
