spawn = (enemy, x, y, ...a) => actor.push(new spawner(enemy, x, y, ...a));

class spawner {
	static spawn = 30;
	constructor(e = tridipyraShip,
	x = rand(canvas.width),
	y = rand(canvas.height), ...a) {
		this.e = e;
		this.x = x;
		this.y = y;
		this.a = a;
		this.timer = this.e.spawn * this.constructor.spawn;
		this.size = 1 / this.e.spawn;
	}
	update(index) {
		if (!--this.timer) {
			actor[index] = new this.e(this.x, this.y, ...this.a)
		}
	}
	draw() {
		const offs = this.timer * this.size;
		ctx.beginPath();
		ctx.strokeStyle = "#f00";
		ctx.moveTo(this.x - offs, this.y);
		ctx.lineTo(this.x, this.y - offs);
		ctx.lineTo(this.x + offs, this.y);
		ctx.lineTo(this.x, this.y + offs);
		ctx.lineTo(this.x - offs, this.y);
		ctx.stroke();
	}
}
