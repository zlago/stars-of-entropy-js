function spawn(...a) {
	actor.push(new spawner(...a));
}

class spawner {
	static timer = 30;
	constructor(en = tridipyraShip,
	x = rand(canvas.width),
	y = rand(canvas.height), ...a) {
		this.en = en;
		this.x = x;
		this.y = y;
		this.a = a;
		this.timer = this.constructor.timer;
	}
	update(index) {
		if (!--this.timer) {
			actor[index] = new this.en(this.x, this.y, ...this.a)
		}
	}
	hurt = dmg => false;
	draw() {
		const offs = this.timer;
		ctx.beginPath();
		ctx.strokeStyle = "#f00";
		ctx.moveTo(this.x - offs, this.y);
		ctx.lineTo(this.x, this.y - offs);
		ctx.lineTo(this.x + offs, this.y);
		ctx.lineTo(this.x, this.y + offs);
		ctx.lineTo(this.x - offs, this.y);
		ctx.stroke()
	}
}
