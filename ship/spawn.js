class spawn {
	constructor(x, y, en) {
		this.en = en;
		this.x = x;
		this.y = y;
		this.timer = 30;
	}
	update(i) {
		if (!--this.timer) {
			enemy[i] = new this.en(this.x, this.y)
		}
	}
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
