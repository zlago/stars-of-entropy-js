globalThis.powerup = class {
	static size = 5;
	static hitbox = 5;
	static timer = 300;
	static blink = 90;
	static healDefault = 5;
	static weaponDefault = "pea";
	constructor(power = "heal", coord, value, ...a) {
		this.power = power;
		this.value = value ?? this.constructor[power + "Default"];
		this.default = !value;
		this.x = (Math.round(coord?.x ?? rand(canvas.width))) + 0.5;
		this.y = (Math.round(coord?.y ?? rand(canvas.height))) + 0.5;
		this.size = this.constructor.size;
		this.hitbox = this.constructor.hitbox;
		this.timer = this.constructor.timer;
		this.spin = 0;
		overwrite(this, a);
	}
	update() {
		if (--this.timer) {
			for (const i in actor) {
				if (collide(this, actor[i])) {
					if (actor[i].powerUp?.(this)) {
						delete actor[this.index];
						break;
					}
				}
			}
		} else {
			delete actor[this.index];
		}
	}
	heal = target => target.hp != target.constructor.hp?
		target.hp = Math.min(target.hp + this.value, target.constructor.hp):
		false;
	weapon = target => target.gun = new globalThis[this.value + "Gun"](target);
	draw() {
		this.spin += 0.1;
		if (this.timer > this.constructor.blink || this.timer % 2) {
			const s = this.size;
			ctx.beginPath();
			ctx.strokeStyle = "#fff";
			ctx.strokeRect(this.x - s, this.y - s, s * 2, s * 2);
			switch (this.power) {
				case "heal":
					const f = s - 2, n = 1;
					ctx.strokeStyle = this.default? "#0f0": "#0ff";
					ctx.strokeRect(this.x - f, this.y - n, f * 2, n * 2);
					ctx.strokeRect(this.x - n, this.y - f, n * 2, f * 2);
					break;
				case "weapon":
					const ins = s - 1.5;
					const spin = Math.sin(this.spin) * ins;
					const thisIcon = icon[this.value];
					const l = thisIcon?.length;
					for (let i = 0; i < l; i++) {
						if (typeof ctx[thisIcon[i]] == "function") {
							switch (ctx[thisIcon[i]].length) {
								case 0:
									ctx[thisIcon[i]]();
									break;
								case 2:
									ctx[thisIcon[i]](
										this.x + thisIcon[i + 1] * spin,
										this.y + thisIcon[i + 2] * ins
									); break;
								case 4:
									ctx[thisIcon[i]](
										this.x + thisIcon[i + 1] * spin,
										this.y + thisIcon[i + 2] * ins,
										thisIcon[i + 3] * spin, thisIcon[i + 4] * ins
									); break;
								case 7:
									ctx[thisIcon[i]](
										this.x + thisIcon[i + 1] * spin,
										this.y + thisIcon[i + 2] * ins,
										Math.abs(thisIcon[i + 3] * spin), thisIcon[i + 4] * ins,
										thisIcon[i + 5], thisIcon[i + 6], thisIcon[i + 7]
									); break;
								default:
									Error();
							}
							i += ctx[thisIcon[i]].length;
						} else {
							ctx[thisIcon[i]] = thisIcon[++i];
						}
					}
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
