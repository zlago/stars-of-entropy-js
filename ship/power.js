class powerup {
	static size = 5;
	static hitbox = 5;
	static timer = 300;
	static blink = 90;
	constructor(power = "hp", e, value, ...a) {
		this.power = power;
		this.value = value;
		switch (power) {
			case "hp": this.value ??= 5; break;
			default: this.value ??= undefined;
		}
		this.x = (Math.round(e?.x ?? rand(canvas.width))) + 0.5;
		this.y = (Math.round(e?.y ?? rand(canvas.height))) + 0.5;
		this.size = this.constructor.size;
		this.hitbox = this.constructor.hitbox;
		this.timer = this.constructor.timer;
		overwrite(this, a);
	}
	update(index) {
		if (--this.timer) {
			for (const i in actor) {
				if (collide(this, actor[i])) {
					if (actor[i].powerUp?.(this)) {
						delete actor[index];
						break;
					}
				}
			}
		} else {
			delete actor[index];
		}
	}
	draw() {
		if (this.timer > this.constructor.blink || this.timer % 2) {
			const s = this.size;
			ctx.beginPath();
			ctx.strokeStyle = "#fff";
			ctx.strokeRect(this.x - s, this.y - s, s * 2, s * 2);
			switch (this.power) {
				case "hp":
					const f = s - 2, n = 1;
					ctx.strokeStyle = "#f00";
					ctx.strokeRect(this.x - f, this.y - n, f * 2, n * 2);
					ctx.strokeRect(this.x - n, this.y - f, n * 2, f * 2);
					break;
				default:
					const i = s - 1.5;
					ctx.strokeStyle = "#f00";
					ctx.moveTo(this.x - i, this.y - i);
					ctx.lineTo(this.x + i, this.y + i);
					ctx.moveTo(this.x - i, this.y + i);
					ctx.lineTo(this.x + i, this.y - i);
			}
			ctx.stroke();
		}
	}
}
