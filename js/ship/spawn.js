const spawn = (enemy, x, y, a) => actor.add(new spawner(enemy, x, y, a));

class spawner {
	static spawn = 30;
	constructor(e = tridipyraShip,
	x = rand(canvas.width),
	y = rand(canvas.height), a) {
		if (typeof e == "string") {
			this.e = ship[e];
		} else {
			this.e = e;
		}
		this.x = x;
		this.y = y;
		this.a = a;
		this.timer = this.e.spawn * this.constructor.spawn;
		this.size = 1 / this.e.spawn;
	}
	update() {
		if (!--this.timer) {
			try {
				actor[this.index] = new this.e(this.x, this.y, this.a);
				actor[this.index].index = this.index;
			} catch (e) { // far too annoying
				delete actor[this.index];
				console.error(e);
			}
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
