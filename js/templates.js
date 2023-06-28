gun.template = class {
	constructor(parent, ...a) {
		this.parent = parent;
		const ammo = shot[this.constructor.ammo];
		this.range = ammo.hp * ammo.speed;
		this.reload = 0;
		this.name = this.constructor.name;
	}
	update = () => this.reload--;
	fire() {
		if (this.reload > 0) {return false;}
		const sin = Math.sin(this.parent.rot), cos = Math.cos(this.parent.rot);
		bullet.add(new shot[this.constructor.ammo](this.parent, sin, cos));
		this.reload = this.constructor.reload;
		return true;
	}
}

shot.template = class {
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
	update() {
		if (this.hp-- > 0) {
			// move
			this.x += this.xVel;
			this.y += this.yVel;
			// hurt
			for (const i in actor) {
				if (actor[i] != this.parent) {
					if (collide(this, actor[i], this.constructor.dmg)) {
						delete bullet[this.index];
						break;
					}
				}
			}
		} else {
			delete bullet[this.index];
		}
	}
}

ship.template = class {
	constructor(x = 0, y = 0, a) {
		this.hp = this.constructor.hp;
		this.x = x;
		this.y = y;
		this.xVel = 0;
		this.yVel = 0;
		this.size = this.constructor.size;
		this.hitbox = this.constructor.hitbox;
		overwrite(this, a);
		this.hpMax = this.hp;
	}
	hurt(dmg) {
		if ((this.hp -= dmg) <= 0) {
			delete actor[this.index];
		}
		return true;
	}
}